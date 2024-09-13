import { Suspense, useEffect } from "react";
import Sidebar from "./Sidebar";
// import Navbar from "./Navbar";
// import { Outlet } from "react-router-dom";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useSetRecoilState } from "recoil";
import { anchorWalletState } from "@/store/wallet_provider";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function Layout() {
  const setAnchorWallet = useSetRecoilState(anchorWalletState);
  const anchorWallet = useAnchorWallet();

  useEffect(() => {
    setAnchorWallet(anchorWallet);
  }, [anchorWallet, setAnchorWallet]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header />
          {/* Page content */}
          <Outlet />
        </div>
      </div>
    </Suspense>
  );
}

export default Layout;
