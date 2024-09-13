import { Search } from "lucide-react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";

const Header = () => {
  const anchorWallet = useAnchorWallet();
  return (
    <header className="shadow-sm z-20 h-16 flex items-center border-b bg-background">
      <div className="flex items-center justify-between px-4 w-full">
        <div className="flex items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" />
            <Input
              className="pl-10 pr-4 py-2 w-64 rounded-lg"
              placeholder="Search in Drive"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
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
          {anchorWallet?.publicKey !== undefined ? (
            <Avatar className="bg-white  ">
              <AvatarImage
                src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${anchorWallet?.publicKey}`}
                alt="@shadcn"
              />
              <AvatarFallback>
                {anchorWallet?.publicKey.toString().charAt(0).toUpperCase() +
                  anchorWallet?.publicKey.toString().slice(1, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ) : (
            <></>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
