import { atom, selector } from "recoil";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { IDL, Ledgerdrive } from "../anchor/idl"; // Replace with your actual IDL import
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";

// Atom for holding the connection
export const connectionState = atom<Connection>({
  key: "connection",
  default: new Connection(clusterApiUrl("devnet"), "confirmed"),
  dangerouslyAllowMutability: true,
});

// Atom for holding the anchor wallet
export const anchorWalletState = atom<AnchorWallet | undefined>({
  key: "anchorWalletState",
  default: undefined,
  dangerouslyAllowMutability: true,
});

// Atom for holding the provider
export const providerState = selector<AnchorProvider | null>({
  key: "providerState",
  dangerouslyAllowMutability: true,
  get: ({ get }) => {
    const connection = get(connectionState);
    const anchorWallet = get(anchorWalletState);

    if (!anchorWallet) {
      return null;
    }

    return new AnchorProvider(connection, anchorWallet, {
      commitment: "confirmed",
      preflightCommitment: "confirmed",
      skipPreflight: false,
    });
  },
});

// Atom for holding the program ID
export const programIdState = atom<PublicKey>({
  key: "programIdState",
  default: new PublicKey("GERZ7aGf8eVmLBpA1hoFJx2AnZXUKxmwYdQqoTdbPPND"),
  dangerouslyAllowMutability: true,
});

// Selector for holding the program
export const programState = selector<Program<Ledgerdrive> | null>({
  key: "programState",
  dangerouslyAllowMutability: true,
  get: ({ get }) => {
    const provider = get(providerState);
    const programId = get(programIdState);

    if (!provider) {
      return null;
    }
    return new Program<Ledgerdrive>(IDL, programId, provider);
  },
});
