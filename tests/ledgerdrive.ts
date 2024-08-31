import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Ledgerdrive } from "../target/types/ledgerdrive";
import { expect } from "chai";

describe("ledgerdrive", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Ledgerdrive as Program<Ledgerdrive>;
  let user: anchor.web3.Keypair, userAccount: anchor.web3.PublicKey, rootFolder: anchor.web3.PublicKey;
  let testFolder: anchor.web3.PublicKey, testFile: anchor.web3.PublicKey;

  let sharedUser: anchor.web3.Keypair;


  before(async () => {
    user = anchor.web3.Keypair.generate();
    sharedUser = anchor.web3.Keypair.generate();
    const request = await provider.connection.requestAirdrop(sharedUser.publicKey, 2 * anchor.web3.LAMPORTS_PER_SOL);
    await provider.connection.confirmTransaction(request);

    // Airdrop some SOL to the user
    const airdropSignature = await provider.connection.requestAirdrop(
      user.publicKey,
      2 * anchor.web3.LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(airdropSignature);
    // Derive PDA for user account and root folder
    [userAccount] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("user_account"), user.publicKey.toBuffer()],
      program.programId
    );

    [rootFolder] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("root_folder"), user.publicKey.toBuffer()],
      program.programId
    );
  });

  it("Initializes user and root folder", async () => {
    await program.methods
      .initializeUser()
      .accounts({
        userAccount,
        rootFolder,
        user: user.publicKey,
      })
      .signers([user])
      .rpc();

    const userAccountData = await program.account.userAccount.fetch(userAccount);
    expect(userAccountData.owner.toString()).to.equal(user.publicKey.toString());
    expect(userAccountData.rootFolder.toString()).to.equal(rootFolder.toString());
    expect(userAccountData.storageUsed.toNumber()).to.equal(0);
    expect(userAccountData.fileCount).to.equal(0);
    expect(userAccountData.folderCount).to.equal(1); // Initial root folder
  });

  it("Create Folder", async () => {
    const folderName = "Test Folder";
    [testFolder] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("folder"), user.publicKey.toBuffer(), Buffer.from([1])],
      program.programId
    );

    await program.methods
      .createFolder(folderName)
      .accounts({
        userAccount,
        folder: testFolder,
        parentFolder: rootFolder,
        user: user.publicKey,
      })
      .signers([user])
      .rpc();

    const folderData = await program.account.folder.fetch(testFolder);
    expect(folderData.owner.toString()).to.equal(user.publicKey.toString());
    expect(folderData.name).to.equal(folderName);
    expect(folderData.parentFolder.toString()).to.equal(rootFolder.toString());
    expect(folderData.isShared).to.be.false;

    const updatedUserAccount = await program.account.userAccount.fetch(userAccount);
    expect(updatedUserAccount.folderCount).to.equal(2);
  });

  it("Upload File", async () => {
    const fileName = "test.txt";
    const fileType = "text/plain";
    const fileSize = 1024; // 1 KB
    const ipfsCid = "QmTest1234567890";

    [testFile] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("file"), user.publicKey.toBuffer(), Buffer.from([0])],
      program.programId
    );
    await program.methods
      .uploadFile(fileName, fileType, new anchor.BN(fileSize), ipfsCid)
      .accounts({
        userAccount,
        file: testFile,
        user: user.publicKey,
        folder: testFolder
      }).
      signers([user])
      .rpc();

    const fileData = await program.account.file.fetch(testFile);
    expect(fileData.owner.toString()).to.equal(user.publicKey.toString());
    expect(fileData.name).to.equal(fileName);
    expect(fileData.fileType).to.equal(fileType);
    expect(fileData.size.toNumber()).to.equal(fileSize);
    expect(fileData.ipfsCid).to.equal(ipfsCid);
    expect(fileData.folder.toString()).to.equal(testFolder.toString());
    expect(fileData.isShared).to.be.false;

    const updatedUserAccount = await program.account.userAccount.fetch(userAccount);
    expect(updatedUserAccount.fileCount).to.equal(1);
    expect(updatedUserAccount.storageUsed.toNumber()).to.equal(fileSize);
  });

  it("Update File", async () => {
    const newFileName = "updated_test.txt";
    const newIpfsCid = "QmUpdated9876543210";

    await program.methods
      .updateFile(newFileName, newIpfsCid, null)
      .accounts({
        file: testFile,
        user: user.publicKey,
      })
      .signers([user])
      .rpc();

    const updatedFileData = await program.account.file.fetch(testFile);
    expect(updatedFileData.name).to.equal(newFileName);
    expect(updatedFileData.ipfsCid).to.equal(newIpfsCid);
  });

  it("Shares a file", async () => {
    const [filePermissionPda] = await anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("file-permission"), testFile.toBuffer(), sharedUser.publicKey.toBuffer()],
      program.programId
    );

    await program.methods
      .shareFile(sharedUser.publicKey, 1)
      .accounts({
        file: testFile,
        filePermission: filePermissionPda,
        sharedUser: sharedUser.publicKey,
        user: user.publicKey,
      }).
      signers([user])
      .rpc();

    const fileInfo = await program.account.file.fetch(testFile);
    expect(fileInfo.isShared).to.be.true;

    const filePermissionInfo = await program.account.filePermission.fetch(filePermissionPda);
    expect(filePermissionInfo.file.toString()).to.equal(testFile.toString());
    expect(filePermissionInfo.user.toString()).to.equal(sharedUser.publicKey.toString());
    expect(filePermissionInfo.permissions).to.equal(1);
  });

  it("Revokes file access", async () => {
    const [filePermissionPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("file-permission"), testFile.toBuffer(), sharedUser.publicKey.toBuffer()],
      program.programId
    );

    await program.methods
      .revokeFileAccess()
      .accounts({
        file: testFile,
        filePermission: filePermissionPda,
        user: user.publicKey,
      }).signers([user])
      .rpc();

    const fileInfo = await program.account.file.fetch(testFile);
    expect(fileInfo.isShared).to.be.false;

    // Check if the file permission account has been closed
    const filePermissionAccount = await provider.connection.getAccountInfo(filePermissionPda);
    expect(filePermissionAccount).to.be.null;
  });

  it("Deletes a file", async () => {
    await program.methods
      .deleteFile()
      .accounts({
        userAccount,
        file: testFile,
        user: user.publicKey,
      })
      .signers([user])
      .rpc();

    const userAccountInfo = await program.account.userAccount.fetch(userAccount);
    expect(userAccountInfo.fileCount).to.equal(0);
    expect(userAccountInfo.storageUsed.toNumber()).to.equal(0);

    // Check if the file account has been closed
    const fileAccount = await provider.connection.getAccountInfo(testFile);
    expect(fileAccount).to.be.null;
  });

  it("Updates a folder", async () => {
    await program.methods
      .updateFolder("Updated Test Folder", null)
      .accounts({
        folder: testFolder,
        user: user.publicKey,
      }).signers([user])
      .rpc();

    const folderInfo = await program.account.folder.fetch(testFolder);
    expect(folderInfo.name).to.equal("Updated Test Folder");
  });

  it("Shares a folder", async () => {
    const [folderPermissionPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("folder-permission"), testFolder.toBuffer(), sharedUser.publicKey.toBuffer()],
      program.programId
    );

    await program.methods
      .shareFolder(sharedUser.publicKey, 1)
      .accounts({
        folder: testFolder,
        folderPermission: folderPermissionPda,
        sharedUser: sharedUser.publicKey,
        user: user.publicKey,
      })
      .signers([user])
      .rpc();

    const folderInfo = await program.account.folder.fetch(testFolder);
    expect(folderInfo.isShared).to.be.true;

    const folderPermissionInfo = await program.account.folderPermission.fetch(folderPermissionPda);
    expect(folderPermissionInfo.folder.toString()).to.equal(testFolder.toString());
    expect(folderPermissionInfo.user.toString()).to.equal(sharedUser.publicKey.toString());
    expect(folderPermissionInfo.permissions).to.equal(1);
  });

  it("Revokes folder access", async () => {
    const [folderPermissionPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("folder-permission"), testFolder.toBuffer(), sharedUser.publicKey.toBuffer()],
      program.programId
    );

    await program.methods
      .revokeFolderAccess()
      .accounts({
        folder: testFolder,
        folderPermission: folderPermissionPda,
        user: user.publicKey,
      })
      .signers([user])
      .rpc();

    const folderInfo = await program.account.folder.fetch(testFolder);
    expect(folderInfo.isShared).to.be.false;

    // Check if the folder permission account has been closed
    const folderPermissionAccount = await provider.connection.getAccountInfo(folderPermissionPda);
    expect(folderPermissionAccount).to.be.null;
  });

  it("Deletes a folder", async () => {
    await program.methods
      .deleteFolder()
      .accounts({
        userAccount,
        folder: testFolder,
        user: user.publicKey,
      })
      .signers([user])
      .rpc();

    const userAccountInfo = await program.account.userAccount.fetch(userAccount);
    expect(userAccountInfo.folderCount).to.equal(1); // Only root folder remains

    // Check if the folder account has been closed
    const folderAccount = await provider.connection.getAccountInfo(testFolder);
    expect(folderAccount).to.be.null;
  });

  it("Fails to delete root folder", async () => {
    try {
      await program.methods
        .deleteFolder()
        .accounts({
          userAccount,
          folder: rootFolder,
          user: user.publicKey,
        })
        .signers([user])
        .rpc();
      expect.fail("The transaction should have failed");
    } catch (error) {
      expect(error.message).to.include("Cannot delete root folder");
    }
  });

  it("Fails to exceed storage limit", async () => {
    const [filePda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("file"), user.publicKey.toBuffer(), Buffer.from([0])],
      program.programId
    );

    try {
      await program.methods
        .uploadFile("large_file.txt", "text/plain", new anchor.BN(10000000001), "QmLargeFile123456789")
        .accounts({
          userAccount,
          file: filePda,
          folder: rootFolder,
          user: user.publicKey,
        })
        .signers([user])
        .rpc();
      expect.fail("The transaction should have failed");
    } catch (error) {
      expect(error.message).to.include("Storage limit exceeded");
    }
  });

  it("Fails to upload file with invalid IPFS CID", async () => {
    const [filePda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("file"), user.publicKey.toBuffer(), Buffer.from([0])],
      program.programId
    );

    try {
      await program.methods
        .uploadFile("invalid_cid.txt", "text/plain", new anchor.BN(1024), "InvalidCIDTooLong".repeat(10))
        .accounts({
          userAccount,
          file: filePda,
          folder: rootFolder,
          user: user.publicKey,
        })
        .signers([user])
        .rpc();
      expect.fail("The transaction should have failed");
    } catch (error) {
      console.log(error.message)
      expect(error.message).to.include("Invalid IPFS CID");
    }
  });

});
