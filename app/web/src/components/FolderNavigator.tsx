import {
  SlashIcon,
  ChevronDownIcon,
  FolderPlus,
  FileUpIcon,
  Loader2,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./ui/menubar";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";

import { FileUploader } from "./FileUpload";
import { ScrollArea } from "./ui/scroll-area";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useFileUpload } from "@/hooks/file-upload";
import { useRecoilState, useRecoilValue } from "recoil";
import { fileUploadInProgressAtom } from "@/store/file_explorer";

function FolderNavigator() {
  const { handleUpload, isDialogOpen, setIsDialogOpen } = useFileUpload();
  const isUploading = useRecoilValue(fileUploadInProgressAtom);
  return (
    <div className="flex justify-between">
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
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          {isUploading == false ? (
            <Button size={"lg"} variant="default">
              Upload File
            </Button>
          ) : (
            <Button size={"lg"} variant="default" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="max-h-[800px] max-w-[800px]">
          <DialogHeader>
            <DialogTitle>File upload</DialogTitle>
          </DialogHeader>
          <ScrollArea className="mt-5">
            <FileUploader />
          </ScrollArea>
          <DialogFooter>
            {isUploading == false ? (
              <Button
                type="submit"
                onSubmit={handleUpload}
                onClick={handleUpload}
              >
                Upload File
              </Button>
            ) : (
              <Button size={"lg"} variant="default" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* <Button size={"lg"}>Upload Files</Button> */}
    </div>
  );
}

export default FolderNavigator;
