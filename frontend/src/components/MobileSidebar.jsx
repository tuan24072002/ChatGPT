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
import { Ellipsis, Pen, Pencil, Sidebar, Trash2 } from 'lucide-react';
const MobileSidebar = () => {
    return (
        <section className="w-full md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Sidebar size={24} className="cursor-pointer absolute right-4 top-4" />
                </SheetTrigger>
                <SheetContent side="left" className="border-none max-w-[300px]">
                    <SheetTitle className="sr-only" />
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

                                        <div className="flex justify-between items-center px-2 py-1 hover:bg-gray-200 rounded-md cursor-pointer">
                                            <SheetClose><p className="text-base text-slate-900">New chat</p></SheetClose>
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
                                        </div>
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