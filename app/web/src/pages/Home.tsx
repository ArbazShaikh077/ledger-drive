import { FileUpIcon, FolderPlus } from "lucide-react";
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
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "../components/ui/context-menu";
import { ScrollArea } from "../components/ui/scroll-area";
import FolderNavigator from "@/components/FolderNavigator";

const Home = () => {
  return (
    <div className="sm:ml-64 mt-16 flex flex-1 border no-scrollbar overflow-y-auto">
      <FolderNavigator />
      <ContextMenu>
        <div className="w-full mt-16 items-center flex flex-col justify-center flex-1 pl-4 pr-4 no-scrollbar overflow-y-auto">
          <ContextMenuTrigger className="w-full flex flex-col flex-1">
            <ScrollArea
              type="always"
              className="w-full rounded-md border overflow-x-auto h-[600px]"
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
                  {Array.from(Array(20).keys()).map((invoice) => (
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
      </ContextMenu>
    </div>
  );
};

export default Home;
