import { ChevronDownIcon, FileUpIcon, FolderPlus, SlashIcon } from 'lucide-react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from './ui/menubar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from './ui/breadcrumb';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from './ui/table';
import { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from './ui/context-menu';
import { useWallet } from '@solana/wallet-adapter-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Body = () => {
    const wallet = useWallet();
    const navigate = useNavigate();

    useEffect(
        () => {
            if (!wallet.connected) {
                navigate('/')
            }
        },
        [wallet.connected]
    );

    return (
        <div className="p-4 sm:ml-64 border-t-2 mt-16">
            <ContextMenu>
                <div className=' h-full w-full items-center justify-center rounded-md border border-dashed text-sm'>
                    <ContextMenuTrigger className="h-full">
                        <div className="p-4 pl-2">
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
                                            <MenubarMenu >
                                                <MenubarTrigger>
                                                    My Drive
                                                    <ChevronDownIcon className='h-5 pl-1' />
                                                </MenubarTrigger>
                                                <MenubarContent>
                                                    <MenubarItem>
                                                        <FolderPlus className='mr-2 h-4' />
                                                        New folder
                                                    </MenubarItem>
                                                    <MenubarSeparator />
                                                    <MenubarItem>
                                                        <FileUpIcon className='mr-2 h-4' />
                                                        File upload
                                                    </MenubarItem>
                                                </MenubarContent>
                                            </MenubarMenu>
                                        </Menubar>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                        <Table className='items-center justify-center mb-4 rounded'>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Name</TableHead>
                                    <TableHead>Owner</TableHead>
                                    <TableHead>Created at</TableHead>
                                    <TableHead className="text-right">File size</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {/* {invoices.map((invoice) => ( */}
                                <TableRow key={"invoice.invoice"}>
                                    <TableCell className="font-medium">Name</TableCell>
                                    <TableCell>Me</TableCell>
                                    <TableCell>19 august, 2024</TableCell>
                                    <TableCell className="text-right">899.1 MB</TableCell>
                                </TableRow>
                                {/* ))} */}
                            </TableBody>
                        </Table>
                    </ContextMenuTrigger>
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
                </div>
            </ContextMenu>

        </div >
    );
};

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <Sidebar />
            <Body />
        </div>
    );
};

export default Dashboard;
