import {
  FileTextIcon,
  FileUpIcon,
  FolderIcon,
  FolderPlus,
  MoreVerticalIcon,
} from "lucide-react";
import FolderNavigator from "./FolderNavigator";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "./ui/context-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { useRecoilValue } from "recoil";
import { currentFolderAtom, file_explorer_atom } from "@/store/file_explorer";
import DateFormatter from "./DateFormatter";

function FileAndFolderListing() {
  const fileAndFolderLoadable = useRecoilValue(file_explorer_atom);
  const currentFolder = useRecoilValue(currentFolderAtom);

  const { files, folders } = fileAndFolderLoadable;

  const formatSize = (size: number) => {
    const units = ["B", "KB", "MB", "GB", "TB"];
    let i = 0;
    while (size >= 1024 && i < units.length - 1) {
      size /= 1024;
      i++;
    }
    return `${size.toFixed(2)} ${units[i]}`;
  };

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
              {folders.map((item, _) => (
                <TableRow key={item.pubkey.toString()}>
                  <TableCell className="font-medium w-[50%]">
                    <div className="flex">
                      <FolderIcon className="h-5 w-5 text-blue-500 mr-2" />
                      {item.name}
                    </div>
                  </TableCell>
                  <TableCell className="w-[20%]"></TableCell>
                  <TableCell className="w-[25%]">
                    <DateFormatter date={item.updatedAt.toNumber() * 1000} />
                  </TableCell>
                  <TableCell className="w-[5%]">
                    <Button variant="ghost" size="icon">
                      <MoreVerticalIcon className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {files.map((item, _) => (
                <TableRow key={item.pubkey.toString()}>
                  <TableCell className="font-medium w-[50%]">
                    <div className="flex">
                      <FileTextIcon className="h-5 w-5 text-primary mr-2" />
                      {item.name}
                    </div>
                  </TableCell>
                  <TableCell className="w-[20%]">
                    {item.type === "file"
                      ? formatSize(item.size.toNumber())
                      : "-"}
                  </TableCell>
                  <TableCell className="w-[25%]">
                    <DateFormatter date={item.updatedAt.toNumber() * 1000} />
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

export default FileAndFolderListing;
