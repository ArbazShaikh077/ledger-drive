import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const wallet = useWallet();
  const navigate = useNavigate();
  useEffect(() => {
    if (wallet.connected) {
      navigate("/dashboard");
    }
  }, [navigate, wallet.connected]);

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <WalletMultiButton />
      <h2 className="scroll-m-20 mt-4 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Connect Wallet to continue
      </h2>
    </div>
  );
}

export default Home;
