import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";
import { anchorWalletState, programState } from "./wallet_provider";
import { PublicKey } from "@solana/web3.js";
import { userAccount } from "@/anchor/setup";
import { Ledgerdrive } from "@/anchor/idl";
import { Program } from "@coral-xyz/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { showToastFromRecoil } from "./toast";

// Selector for fetching the user account
export const accountStateSelector = selector<userAccount | null>({
  key: "account_state_selector",
  dangerouslyAllowMutability: true,
  get: async ({ get }) => {
    try {
      console.log("Inside the account existence checking");
      const anchorWallet = get(anchorWalletState);
      const program = get(programState);

      if (!anchorWallet || !program) {
        console.log("Wallet or program is null");
        return null;
      }
      const [userAccount] = PublicKey.findProgramAddressSync(
        [Buffer.from("user_account"), anchorWallet!.publicKey!.toBuffer()],
        program!.programId
      );
      const response = await program!.account.userAccount.fetch(userAccount);
      return response;
    } catch (e) {
      console.log(
        `Exception occurred while checking the user account initialization ${e}`
      );
      return null;
    }
  },
});

// Atom for holding the account state
export const accountState = atom<userAccount | null>({
  key: "account_state",
  default: accountStateSelector,
  dangerouslyAllowMutability: true,
});

// Function to create a new user account and update the atom
export const createAndSetUserAccount = async (
  program: Program<Ledgerdrive>,
  anchorWallet: AnchorWallet
): Promise<userAccount | null> => {
  try {
    const [userAccount] = PublicKey.findProgramAddressSync(
      [Buffer.from("user_account"), anchorWallet!.publicKey!.toBuffer()],
      program!.programId
    );
    const [rootFolder] = PublicKey.findProgramAddressSync(
      [Buffer.from("root_folder"), anchorWallet!.publicKey!.toBuffer()],
      program!.programId
    );

    const transaction = await program!.methods
      .initializeUser()
      .accounts({
        rootFolder: rootFolder,
        user: anchorWallet!.publicKey!,
        userAccount: userAccount,
      })
      .rpc();
    console.log(
      `Successfully completed the transaction with id : ${transaction}`
    );

    // Fetch the newly created account
    const newUserAccount = await program.account.userAccount.fetch(userAccount);

    return newUserAccount;
  } catch (e: any) {
    showToastFromRecoil({
      title: "Transaction Failed",
      description: e.toString(),
      variant: "destructive",
    });
    console.log(`Exception occurred while initializing the user account ${e}`);
    return null;
  }
};

// Hook to use the createAndSetUserAccount function
export const useCreateAndSetUserAccount = () => {
  const program = useRecoilValue(programState);
  const anchorWallet = useRecoilValue(anchorWalletState);
  const setAccountState = useSetRecoilState(accountState);
  return async () => {
    if (!program || !anchorWallet) {
      console.error("Program or wallet is not initialized");
      return;
    }
    try {
      // Update the atom with the new account

      const newUserAccount = await createAndSetUserAccount(
        program,
        anchorWallet
      );
      setAccountState(newUserAccount);
    } catch (error) {
      console.error("Failed to create and set user account:", error);
    }
  };
};
