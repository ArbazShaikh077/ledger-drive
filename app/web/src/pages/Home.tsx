import {
  ChevronDownIcon,
  FileUpIcon,
  FolderPlus,
  SlashIcon,
} from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "../components/ui/menubar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../components/ui/table";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../components/ui/context-menu";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { anchorWalletState } from "@/store/wallet_provider";
import { ScrollArea } from "../components/ui/scroll-area";

const Home = () => {
  const setAnchorWallet = useSetRecoilState(anchorWalletState);
  const anchorWallet = useAnchorWallet();
  useEffect(() => {
    setAnchorWallet(anchorWallet);
  }, [anchorWallet, setAnchorWallet]);
  return (
    <div className="sm:ml-64 mt-16 flex flex-1 border">
      <div className="p-4 pl-2 w-full fixed z-50 bg-background">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>
                    My Drive
                    <ChevronDownIcon className="h-5 pl-1" />
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                      <FolderPlus className="mr-2 h-4" />
                      New folder
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                      <FileUpIcon className="mr-2 h-4" />
                      File upload
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <ContextMenu>
        <div className="w-full mt-16 items-center flex flex-col justify-center flex-1 m-10">
          <ContextMenuTrigger className="w-full flex flex-col flex-1">
            <ScrollArea
              type="always"
              className="w-full rounded-md border overflow-x-auto h-auto"
            >
              <Table className="items-center justify-center mb-4 rounded overflow-clip">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Created at</TableHead>
                    <TableHead className="text-right">File size</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from(Array(10).keys()).map((invoice) => (
                    <TableRow key={invoice}>
                      <TableCell className="font-medium">Name</TableCell>
                      <TableCell>Me</TableCell>
                      <TableCell>19 august, 2024</TableCell>
                      <TableCell className="text-right">899.1 MB</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </ContextMenuTrigger>
        </div>
        <ContextMenuContent className="w-64">
          <ContextMenuItem inset>
            Back
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset disabled>
            Forward
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset>
            Reload
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                Save Page As...
                <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>Create Shortcut...</ContextMenuItem>
              <ContextMenuItem>Name Window...</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>Developer Tools</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem checked>
            Show Bookmarks Bar
            <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuRadioGroup value="pedro">
            <ContextMenuLabel inset>People</ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuRadioItem value="pedro">
              Pedro Duarte
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
};

export default Home;
