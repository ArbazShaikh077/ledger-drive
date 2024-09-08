import { atom, selector } from "recoil";
import { anchorWalletState, programState } from "./wallet_provider";
import { PublicKey } from "@solana/web3.js";

// Atom for holding the connection
export const accountState = atom<boolean>({
  key: "account_state",
  default: false,
});

// Atom for holding the provider
export const accountStateProvider = selector<boolean>({
  key: "account_state_selector",
  get: async ({ get }) => {
    try {
      console.log("Inside the account existence checking");
      const anchorWallet = get(anchorWalletState);
      const program = get(programState);

      if (!anchorWallet || !program) {
        console.log("Wallet or program is null");
        return false;
      }
      const [userAccount] = PublicKey.findProgramAddressSync(
        [Buffer.from("user_account"), anchorWallet!.publicKey!.toBuffer()],
        program!.programId
      );
      const response = await program!.account.userAccount.fetch(userAccount);
      console.log(response);
      if (response) {
        return true;
      }
      return false;
    } catch (e) {
      console.log(
        `Exception occurred while checking the user account initialization ${e}`
      );
      return false;
    }
  },
});
