import {
  FileTextIcon,
  FileUpIcon,
  FolderIcon,
  FolderPlus,
  MoreVerticalIcon,
} from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "../components/ui/context-menu";
import FolderNavigator from "@/components/FolderNavigator";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { accountState } from "@/store/account_provider";
import InitializeAccount from "@/components/InitializeAccount";
import ConnectYourWallet from "@/components/ConnectWallet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";

const fileTypes = [
  "pdf",
  "doc",
  "xls",
  "ppt",
  "txt",
  "jpg",
  "png",
  "mp3",
  "mp4",
];
const folderNames = [
  "Documents",
  "Pictures",
  "Videos",
  "Music",
  "Projects",
  "Backups",
  "Work",
  "Personal",
  "Downloads",
  "Shared",
];

const dummyItems = Array.from({ length: 50 }, (_, index) => {
  if (index % 5 === 0) {
    return {
      type: "folder",
      name: `${folderNames[Math.floor(Math.random() * folderNames.length)]} ${
        index + 1
      }`,
      size: "--",
      lastModified: new Date(
        Date.now() - Math.random() * 10000000000
      ).toLocaleDateString(),
    };
  } else {
    const fileType = fileTypes[Math.floor(Math.random() * fileTypes.length)];
    return {
      type: "file",
      name: `File ${index + 1}.${fileType}`,
      size: `${Math.floor(Math.random() * 1000)} KB`,
      lastModified: new Date(
        Date.now() - Math.random() * 10000000000
      ).toLocaleDateString(),
    };
  }
});

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
    return (
      <main className="flex-1 overflow-x-auto overflow-y-auto bg-background px-4">
        <div className="sticky top-0 z-10 bg-background shadow-sm">
          <div className="py-4">
            <FolderNavigator />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Name</TableHead>
                <TableHead className="w-[20%]">Size</TableHead>
                <TableHead className="w-[25%]">Last modified</TableHead>
                <TableHead className="w-[5%]"></TableHead>
              </TableRow>
            </TableHeader>
          </Table>
        </div>
        <ContextMenu>
          <ContextMenuTrigger className="w-full flex flex-col flex-1">
            <Table>
              <TableBody>
                {dummyItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium w-[50%]">
                      <div className="flex">
                        {item.type === "folder" ? (
                          <FolderIcon className="h-5 w-5 text-blue-500 mr-2" />
                        ) : (
                          <FileTextIcon className="h-5 w-5 text-primary mr-2" />
                        )}
                        {item.name}
                      </div>
                    </TableCell>
                    <TableCell className="w-[20%]">{item.size}</TableCell>
                    <TableCell className="w-[25%]">
                      {item.lastModified}
                    </TableCell>
                    <TableCell className="w-[5%]">
                      <Button variant="ghost" size="icon">
                        <MoreVerticalIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <ContextMenuContent className="w-64">
              <ContextMenuItem>
                <FileUpIcon className="mr-1 h-4" />
                File upload
                <ContextMenuShortcut>⌘[</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>
                <FolderPlus className="mr-2 h-4" />
                New folder
                <ContextMenuShortcut>⌘[</ContextMenuShortcut>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenuTrigger>
        </ContextMenu>
      </main>
    );
  }
};

export default Home;
