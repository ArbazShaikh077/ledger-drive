import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useRecoilValueLoadable } from "recoil";
import { accountState } from "@/store/account_provider";
import InitializeAccount from "@/components/InitializeAccount";
import ConnectYourWallet from "@/components/ConnectWallet";
import Loader from "@/components/Loader";
import FileAndFolderListing from "@/components/FileAndFolderListing";

const Home = () => {
  const anchorWallet = useAnchorWallet();
  const account_status = useRecoilValueLoadable(accountState);
  if (account_status.state == "loading") {
    return <Loader />;
  }
  if (anchorWallet?.publicKey === undefined) {
    return <ConnectYourWallet />;
  } else if (!account_status.contents) {
    return <InitializeAccount />;
  } else {
    return <FileAndFolderListing />;
  }
};

export default Home;
