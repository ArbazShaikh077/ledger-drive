import { useWallet } from "@solana/wallet-adapter-react";
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const wallet = useWallet();
  const navigate = useNavigate();
  useEffect(() => {
    if (!wallet.connected) {
      navigate("/", { replace: true });
    }
  }, [wallet, navigate]);
  return children;
}
