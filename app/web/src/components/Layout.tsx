import { Suspense, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useSetRecoilState } from "recoil";
import { anchorWalletState } from "@/store/wallet_provider";

function Layout() {
  const setAnchorWallet = useSetRecoilState(anchorWalletState);
  const anchorWallet = useAnchorWallet();
  useEffect(() => {
    setAnchorWallet(anchorWallet);
  }, [anchorWallet, setAnchorWallet]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Sidebar />
        <div className="flex h-screen flex-col">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </Suspense>
  );
}

export default Layout;
