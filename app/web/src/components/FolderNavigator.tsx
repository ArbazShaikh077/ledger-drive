import {
  SlashIcon,
  ChevronDownIcon,
  FolderPlus,
  FileUpIcon,
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

function FolderNavigator() {
  return (
    <div className="p-3 pl-2 w-full fixed z-50 bg-background">
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
  );
}

export default FolderNavigator;
