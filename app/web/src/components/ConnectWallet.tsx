import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Vortex } from "./Vortex";

function ConnectYourWallet() {
  return (
    <div className="flex flex-1 items-center justify-center bg-red-50">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={50}
        baseHue={120}
        className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
      >
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Connect Your Wallet
        </h1>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
          To continue, please connect your wallet. This will enable you to
          interact with our platform and access all its features.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <WalletMultiButton
            style={{
              backgroundColor: "white",
              color: "black",
              height: "35px",
              fontSize: "15px",
              fontWeight: "500",
              borderRadius: "5px",
            }}
          />
        </div>
      </Vortex>
    </div>
  );
}

export default ConnectYourWallet;
