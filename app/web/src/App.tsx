import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { lazy, Suspense, useMemo } from "react";
import { clusterApiUrl } from "@solana/web3.js";
import { RecoilRoot } from "recoil";
import ProtectedRoute from "./utils/ProtectedRoute";

const SharedWithMe = lazy(() => import("./pages/SharedWithMe"));
const MyDrive = lazy(() => import("./pages/MyDrive"));
const Home = lazy(() => import("./pages/Home"));
const Layout = lazy(() => import("./components/Layout"));
const LandingPage = lazy(() => import("./pages/LandingPage"));

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
                <Suspense fallback={<div>Loading...</div>}>
                  <RouterProvider router={router} />
                </Suspense>
              </ThemeProvider>
            </WalletModalProvider>
          </WalletProvider>
        </RecoilRoot>
      </ConnectionProvider>
    </>
  );
}

export default App;
