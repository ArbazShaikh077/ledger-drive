import { Button } from "./ui/button";
import { Vortex } from "./Vortex";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { anchorWalletState, programState } from "@/store/wallet_provider";
import { PublicKey } from "@solana/web3.js";
import { accountState } from "@/store/account_provider";
import { useCallback } from "react";

function InitializeAccount() {
  const program = useRecoilValue(programState);
  const anchorWalletStateProvider = useRecoilValue(anchorWalletState);
  const userAccountState = useSetRecoilState(accountState);
  const initializeUser = useCallback(async () => {
    try {
      const [userAccount] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("user_account"),
          anchorWalletStateProvider!.publicKey!.toBuffer(),
        ],
        program!.programId
      );
      const [rootFolder] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("root_folder"),
          anchorWalletStateProvider!.publicKey!.toBuffer(),
        ],
        program!.programId
      );
      const transaction = await program!.methods
        .initializeUser()
        .accounts({
          rootFolder: rootFolder,
          user: anchorWalletStateProvider!.publicKey!,
          userAccount: userAccount,
        })
        .rpc();
      console.log(
        `Successfully completed the transaction with id : ${transaction}`
      );
    } catch (e) {
      console.log("Exception occured while initializing the user account");
    }
  }, [anchorWalletStateProvider, program]);

  const setUserAccount = useCallback(async () => {
    try {
      console.log("Inside the account setter");
      if (!anchorWalletStateProvider || !program) {
        console.log("Wallet or program is null");
        return;
      }
      const [userAccount] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("user_account"),
          anchorWalletStateProvider!.publicKey!.toBuffer(),
        ],
        program!.programId
      );
      const response = await program!.account.userAccount.fetch(userAccount);
      userAccountState(response);
    } catch (e) {
      console.log(
        `Exception occurred while checking the user account initialization ${e}`
      );
      return;
    }
  }, [anchorWalletStateProvider, program, userAccountState]);

  return (
    <div className="flex flex-1 items-center justify-center">
      <Vortex
        backgroundColor="bg-background"
        rangeY={800}
        particleCount={50}
        baseHue={120}
        className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
      >
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Initialize Account
        </h1>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
          <span className="font-extrabold">Let’s get started!</span> Click the
          button below to begin initializing your account with Ledger Drive.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <Button
            style={{
              backgroundColor: "white",
              color: "black",
              height: "35px",
              fontSize: "15px",
              fontWeight: "500",
              borderRadius: "5px",
            }}
            onClick={async () => {
              await initializeUser();
              await setUserAccount();
            }}
          >
            Initialize Account
          </Button>
        </div>
      </Vortex>
    </div>
  );
}

export default InitializeAccount;
