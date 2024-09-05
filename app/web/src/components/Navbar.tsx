import { SidebarCloseIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
// import { program } from '@/anchor/setup';
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useRecoilValue } from "recoil";
import { programState } from "@/store/wallet_provider";

// import {  useConnection, useWallet } from '@solana/wallet-adapter-react';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const anchorWallet = useAnchorWallet();
  const program = useRecoilValue(programState);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <nav className="fixed top-0 w-full z-[1000]">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                aria-controls="logo-sidebar"
                type="button"
                onClick={toggleSidebar}
                className="inline-flex items-center p-2 mr-2 text-sm rounded-lg sm:hidden  focus:outline-none focus:ring-2 focus:bg-secondary dark:bg-secondary dark:hover:bg-secondary dark:focus:bg-secondary"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8 me-3"
                alt="FlowBite Logo"
              />
              <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-2xl">
                LedgerDrive
              </h1>
            </div>
          </div>
        </div>
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 z-40 w-64 h-full p-4 overflow-y-hidden bg-primary-foreground dark:bg-primary-foreground transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            type="button"
            onClick={toggleSidebar}
            className="hover:bg-secondary dark:hover:bg-secondary"
          >
            <SidebarCloseIcon />
          </button>
          <ul className="mt-6">
            <li>
              <a
                // href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-secondary dark:hover:bg-secondary group"
              >
                <span className="ms-3">Home</span>
              </a>
            </li>
            <li>
              <a
                // href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-secondary dark:hover:bg-secondary group"
              >
                <span className="ms-3">My Drive</span>
              </a>
            </li>
            <li>
              <a
                // href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-secondary dark:hover:bg-secondary group"
              >
                <span className="ms-3">Shared with me</span>
              </a>
            </li>
          </ul>
        </div>

        {/* End Sidebar */}
      </nav>
      <div className="fixed top-0 left-0 inset-x-0 sm:ml-64 border-b-2 p-4 bg-background z-[999]">
        <div className="flex justify-end ">
          <div className="">
            <Button
              onClick={async () => {
                const [userAccount] = PublicKey.findProgramAddressSync(
                  [
                    Buffer.from("user_account"),
                    anchorWallet!.publicKey!.toBuffer(),
                  ],
                  program!.programId
                );
                //                             const [rootFolder] = PublicKey.findProgramAddressSync(
                //                                 [Buffer.from("root_folder"),anchorWallet!.publicKey!.toBuffer()],
                //                                 programId,
                //                             );

                //                             const transaction = await program.methods.initializeUser().accounts({
                //                                     rootFolder: rootFolder,
                //                                     user: anchorWallet!.publicKey!,
                //                                     userAccount: userAccount,
                //                                 }).rpc();
                //                             //   const sign = await anchorWallet!.signTransaction(transaction);
                //    console.log(
                //     `View on explorer: https://solana.fm/tx/${transaction}?cluster=devnet-alpha`,
                //   );
                const response = await program!.account.userAccount.fetch(
                  userAccount
                );

                console.log(`All users is ${JSON.stringify(response)}`);
              }}
            >
              Initialize Account
            </Button>
            {/* <button
                                    type="button"
                                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        className="w-8 h-8 rounded-full"
                                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                        alt="user photo"
                                    />
                                </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
