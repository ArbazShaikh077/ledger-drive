import { IdlAccounts, Program } from "@coral-xyz/anchor";
import { IDL, Ledgerdrive } from "./idl";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

const programId = new PublicKey("GERZ7aGf8eVmLBpA1hoFJx2AnZXUKxmwYdQqoTdbPPND");
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export const program = new Program<Ledgerdrive>(IDL, programId, {
  connection,
});

export type userAccount = IdlAccounts<Ledgerdrive>["userAccount"];
export type FileTypeAccount = IdlAccounts<Ledgerdrive>["file"];
export type FolderTypeAccount = IdlAccounts<Ledgerdrive>["folder"];
