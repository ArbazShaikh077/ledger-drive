import { atom, selector } from "recoil";
import { anchorWalletState, programState } from "./wallet_provider";
import { PublicKey } from "@solana/web3.js";
import { userAccount } from "@/anchor/setup";

// Selector for fetching the user account
export const accountStateSelector = selector<userAccount | null>({
  key: "account_state_selector",
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
});
