import { atom, selector } from "recoil";
import { programState } from "./wallet_provider";
import { accountState } from "./account_provider";
import { PublicKey } from "@solana/web3.js";

export const currentFolderAtom = atom<PublicKey | null>({
  key: "currentFolder",
  default: null,
});

export const fileExplorerSelector = selector({
  key: "fileExplorerSelector",
  get: async ({ get }) => {
    console.log("Inside the file explorer");
    const program = get(programState);
    const userAccount = get(accountState);
    const currentFolder = get(currentFolderAtom);

    const folders = await program!.account.folder.all([
      {
        memcmp: {
          offset: 8, // owner
          bytes: userAccount!.owner!.toBase58(),
        },
      },
      // {
      //   memcmp: {
      //     offset: 8 + 32 + 64, // parent_folder
      //     bytes: currentFolder!.toBase58(),
      //   },
      // },
    ]);

    // Fetch files
    const files = await program!.account.file.all([
      {
        memcmp: {
          offset: 8, // owner
          bytes: userAccount!.owner!.toBase58(),
        },
      },
      // {
      //   memcmp: {
      //     offset: 8 + 32 + 64 + 32 + 8 + 64, // folder
      //     bytes: currentFolder!.toBase58(),
      //   },
      // },
    ]);
    console.log(`Result is ${folders} ${files}`);
    return {
      folders: folders.map((f) => ({
        ...f.account,
        pubkey: f.publicKey,
        type: "folder",
      })),
      files: files.map((f) => ({
        ...f.account,
        pubkey: f.publicKey,
        type: "file",
      })),
    };
  },
});

export const file_explorer_atom = atom({
  key: "file_explorer_atom",
  default: fileExplorerSelector,
});

export const filesState = atom<File[]>({
  key: "filesState",
  default: [],
});

export const uploadedPinataCIDAtom = atom({
  key: "uploadedPinataCIDAtom",
  default: {},
});

export const fileUploadInProgressAtom = atom<boolean>({
  key: "fileUploadInprogressAtom",
  default: false,
});
