import { Ellipsis, Pen, Pencil, Trash2 } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppContext } from "../context/UseContextCustom"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Link } from "react-router-dom"
import { useEffect } from "react"

const DesktopSidebar = () => {
    const { chatList, fetchDataChatList, openSidebar } = useAppContext();
    useEffect(() => {
        fetchDataChatList();
    }, [fetchDataChatList])

    return (
        <div className={`transition-all duration-300 h-screen ease-in-out ${openSidebar ? 'w-64' : 'w-0'} overflow-hidden md:block hidden`}>
            <Card className="h-full rounded-none border-r border-gray-200">
                <CardContent className="p-4 h-full flex flex-col">
                    <Link to={"/"} className="w-full mb-4 flex items-center justify-between py-2 px-4 rounded-md border border-slate-300 hover:bg-gray-200" variant="outline">
                        <div className="flex items-center gap-2">
                            <img src="/ChatGPT_logo.svg" alt="Logo" className="size-5" />
                            ChatGPT
                        </div>
                        <Pen className="size-4" />
                    </Link>
                    <ScrollArea className="flex-grow">
                        <div className="space-y-2">
                            <div className="flex flex-col gap-1">
                                <p className="font-semibold text-xs px-2">Hôm nay</p>
                                {
                                    chatList?.length > 0 && chatList?.map((item, index) => (
                                        <Link key={"ChatList" + index} to={`/chat/${item.chatId}`} className="flex justify-between items-center px-2 py-1 hover:bg-gray-200 rounded-md cursor-pointer">
                                            <p className="text-base text-slate-900">{item.title}</p>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger><Ellipsis className="size-5" /></DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem className="flex items-center gap-2">
                                                        <Pencil size={16} />
                                                        <span>Đổi tên</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex items-center gap-2 text-red-500">
                                                        <Trash2 size={16} />
                                                        <span>Xóa</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    )
}

export default DesktopSidebar