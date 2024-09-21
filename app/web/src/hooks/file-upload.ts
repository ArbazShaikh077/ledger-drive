import { useRecoilState, useRecoilValue } from "recoil";
import { filesState, fileUploadInProgressAtom } from "@/store/file_explorer";
import { anchorWalletState, programState } from "@/store/wallet_provider";
import { useToast } from "@/store/toast";
import axios from "axios";
import * as anchor from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
import { useState } from "react";

const Transaction = anchor.web3.Transaction;

export const useFileUpload = () => {
  const [files, setFiles] = useRecoilState(filesState);
  const anchorWallet = useRecoilValue(anchorWalletState);
  const program = useRecoilValue(programState);
  const [_, fileProgressUpdater] = useRecoilState(fileUploadInProgressAtom);
  const showToast = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const pinFileToIPFS = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const pinataApiKey = import.meta.env.VITE_API_KEY;
    const pinataSecretApiKey = import.meta.env.VITE_API_SECRET;

    try {
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": `multipart/form-data`,
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
          },
        }
      );
      console.log("File uploaded successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw Error("Not able to upload the file");
    }
  };

  const uploadFile = async (file: File) => {
    try {
      const upload = await pinFileToIPFS(file);
      console.log(`Value of the object is ${JSON.stringify(upload)}`);
      return {
        name: file.name,
        fileType: file.name.split(".").pop(),
        size: file.size,
        ipfsCid: upload.IpfsHash,
      };
    } catch (error) {
      console.error(`Error uploading file ${file.name}:`, error);
      return null;
    }
  };

  const uploadToSolana = async (fileInfos: any[]) => {
    console.log(`File object is ${JSON.stringify(fileInfos)}`);
    const [userAccountPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("user_account"), anchorWallet!.publicKey.toBuffer()],
      program!.programId
    );

    const userAccount = await program!.account.userAccount.fetch(
      userAccountPDA
    );

    console.log(`User account ${JSON.stringify(userAccount)}`);

    const [rootFolderPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("root_folder"), anchorWallet!.publicKey.toBuffer()],
      program!.programId
    );

    const transaction = new Transaction();

    for (let i = 0; i < fileInfos.length; i++) {
      const { name, fileType, size, ipfsCid } = fileInfos[i];
      console.log(`CID is ${ipfsCid}`);
      const [filePDA] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("file"),
          anchorWallet!.publicKey.toBuffer(),
          Buffer.from([userAccount.fileCount + i]),
        ],
        program!.programId
      );

      const ix = await program!.methods
        .uploadFile(name, fileType, new BN(size), ipfsCid)
        .accounts({
          userAccount: userAccountPDA,
          file: filePDA,
          user: anchorWallet!.publicKey,
          folder: rootFolderPDA,
        })
        .instruction();

      transaction.add(ix);
    }

    const txid = await program!.provider.sendAndConfirm!(transaction);

    console.log(
      `Transaction confirmed: https://explorer.solana.com/tx/${txid}`
    );
  };

  const handleUpload = async () => {
    fileProgressUpdater(true);
    try {
      showToast({
        title: "File is uploading",
        description: "Please wait...",
      });

      const fileInfos = [];
      for (const file of files) {
        const fileInfo = await uploadFile(file);
        if (fileInfo) fileInfos.push(fileInfo);
      }

      console.log(`Final result is ${JSON.stringify(fileInfos)}`);
      await uploadToSolana(fileInfos);

      setFiles([]);
      fileProgressUpdater(false);
      showToast({
        title: "File is uploaded successfully",
        description: "",
      });
      setIsDialogOpen(false);
    } catch (error) {
      fileProgressUpdater(false);
      console.log(`Exception occurred while uploading the file : ${error}`);
    }
  };

  return {
    files,
    setFiles,
    handleUpload,
    isDialogOpen,
    setIsDialogOpen,
  };
};
