import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { useMemo } from "react";
import { clusterApiUrl } from "@solana/web3.js";
import { RecoilRoot } from "recoil";
import ProtectedRoute from "./utils/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import MyDrive from "./pages/MyDrive";
import SharedWithMe from "./pages/SharedWithMe";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard/",
        element: <Home />,
      },
      {
        path: "/dashboard/my-drive",
        element: <MyDrive />,
      },
      {
        path: "/dashboard/shared-with-me",
        element: <SharedWithMe />,
      },
    ],
  },
]);
window.Buffer = Buffer;
function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [], [network]);

  return (
    <>
      <ConnectionProvider endpoint={endpoint}>
        <RecoilRoot>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <RouterProvider router={router} />
              </ThemeProvider>
            </WalletModalProvider>
          </WalletProvider>
        </RecoilRoot>
      </ConnectionProvider>
    </>
  );
}

export default App;
