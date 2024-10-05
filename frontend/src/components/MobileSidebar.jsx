import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
    SheetClose
} from "./ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis, Loader, LogIn, Pen, Pencil, Sidebar, Trash2 } from 'lucide-react';
import { useAppContext } from "../context/UseContextCustom";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { deleteUserChat } from "../services/apiServices";
import { toast } from "sonner"
import { ClerkLoading, SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";

const MobileSidebar = () => {
    const { chatList, fetchDataChatList } = useAppContext();
    const { user } = useUser();
    const navigate = useNavigate();
    useEffect(() => {
        fetchDataChatList();
    }, [fetchDataChatList])
    const handleDeleteChat = async (chatId) => {
        const res = await deleteUserChat(chatId);
        if (res.data) {
            toast.success("Xoá chat thành công!");
            navigate("/");
            await fetchDataChatList();
        }
    }


    return (
        <section className="w-full md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Sidebar size={24} className="cursor-pointer absolute right-4 top-4" />
                </SheetTrigger>
                <SheetContent side="left" className="border-none max-w-[300px]">
                    <SheetTitle>
                        <ClerkLoading>
                            <Loader size={'2em'} className='spin' />
                        </ClerkLoading>
                        <SignedIn>
                            <div className="flex items-center justify-center gap-2 ">
                                <UserButton appearance={{
                                    theme: "dark",
                                    size: "large",
                                }} />
                                <p className="text-sm font-semibold">
                                    {user.fullName || user.firstName || user.username}
                                </p>
                            </div>
                        </SignedIn>
                        <SignedOut>
                            <LogIn onClick={() => navigate("/sign-in")} className='cursor-pointer z-10' />
                        </SignedOut>
                    </SheetTitle>
                    <div className="h-full rounded-none">
                        <div className="p-4 h-full flex flex-col">
                            <Button className="w-full mb-4 flex items-center justify-between" variant="outline">
                                <div className="flex items-center gap-2">
                                    <img src="/ChatGPT_logo.svg" alt="Logo" className="size-5" />
                                    ChatGPT
                                </div>
                                <Pen className="size-4" />
                            </Button>
                            <ScrollArea className="flex-grow">
                                <div className="space-y-2">
                                    <div className="flex flex-col gap-1">
                                        <p className="font-semibold text-xs px-2">Hôm nay</p>
                                        {
                                            chatList?.length > 0 && chatList?.map((item, index) => {
                                                return (
                                                    <Link key={"ChatList" + index} to={`/chat/${item._id}`} className="flex justify-between items-center px-2 py-1 hover:bg-gray-200 rounded-md cursor-pointer">
                                                        <SheetClose><p className="text-base text-slate-900">{item.title}</p></SheetClose>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger><Ellipsis className="size-5" /></DropdownMenuTrigger>
                                                            <DropdownMenuContent>
                                                                <DropdownMenuItem className="flex items-center gap-2">
                                                                    <Pencil size={16} />
                                                                    <span>Đổi tên</span>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem className="flex items-center gap-2 text-red-500" onClick={() => handleDeleteChat(item._id)}>
                                                                    <Trash2 size={16} />
                                                                    <span>Xóa</span>
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </Link>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </ScrollArea>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    )
}

export default MobileSidebar