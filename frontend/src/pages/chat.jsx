import { Link, useParams } from "react-router-dom"
import React, { useCallback, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Download, Folder, User } from "lucide-react";
import FormChat from "../components/FormChat";
import MarkdownChat from "../components/MarkdownChat";
import useChatStore from "../store/useChatStore";
import { downloadFile, getChatById } from "../services/apiServices";
import { useUser } from "@clerk/clerk-react"
import { Image as ImgLightBox } from "lightbox.js-react"

const Chat = () => {
    const { setDataChat, dataChat, answer, question, img, isChatting } = useChatStore();
    const endRef = useRef(null);
    const { user } = useUser();
    const { chatId } = useParams();
    const getChat = useCallback(async () => {
        const res = await getChatById(chatId);
        setDataChat(res.data)
    }, [chatId, setDataChat])
    useEffect(() => {
        if (!isChatting) {
            getChat();
        }
    }, [getChat, isChatting])
    useEffect(() => {
        endRef?.current.scrollIntoView({ behavior: "smooth" })
    }, [dataChat, answer, question, img.dbData])
    const handleDownloadFile = async (fileUrl) => {
        const res = await downloadFile(fileUrl)
        const urlBlob = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a')
        link.href = urlBlob
        link.setAttribute("download", fileUrl.split('/').pop())
        document.body.appendChild(link)
        link.click()
        link.remove()
        window.URL.revokeObjectURL(urlBlob)
    }

    return (
        <div className="flex-1 w-full h-full flex flex-col items-center">
            <div className="w-[90%] lg:w-[70%] h-full container mx-auto">
                <div className="flex-1 flex flex-col h-screen overflow-hidden">
                    <ScrollArea className="flex-1 p-4">
                        {
                            dataChat && dataChat?.history?.length > 0 && dataChat?.history?.map((message, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        {
                                            message.role === "user"
                                                ? <div className={`flex justify-end mb-4 animate-fadeIn`}>
                                                    <div className={`flex items-start max-w-[80%] flex-row-reverse`}>
                                                        <Avatar className="w-8 h-8">
                                                            <AvatarFallback>
                                                                {
                                                                    user ? <img src={user?.imageUrl} alt="Avatar" /> : <User />
                                                                }
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <Card className={`mx-2 w-[70%] bg-blue-500 text-white`}>
                                                            <CardContent className="p-3 flex flex-col gap-4">
                                                                {
                                                                    message.img &&
                                                                    <ImgLightBox className='rounded-lgw-[300px] h-[200px]' image={{ src: message.img, title: message.img }} />
                                                                }
                                                                {
                                                                    message.file &&
                                                                    <Link target="_blank" to={`http://localhost:1234${String(message.file).replace(".", "")}`} className='flex justify-center gap-8 p-2 cursor-pointer group'>
                                                                        <div className="relative">
                                                                            <span className="opacity-100 group-hover:opacity-0 cursor-pointer transition-all duration-300 absolute left-0 top-0">
                                                                                <Folder className="size-6" />
                                                                            </span>
                                                                            <span
                                                                                className='opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-300 absolute left-0 top-0'
                                                                                onClick={() => handleDownloadFile(`http://localhost:1234${String(message.file).replace(".", "")}`)}
                                                                            >
                                                                                <Download className="size-6" />
                                                                            </span>
                                                                        </div>
                                                                        <div className="text-sm truncate w-32">{message.file.split("/").pop()}</div>
                                                                    </Link>

                                                                }
                                                                <MarkdownChat content={message.parts[0].text} />
                                                            </CardContent>
                                                        </Card>
                                                    </div>
                                                </div>
                                                : <div className={`flex justify-start mb-4 animate-fadeIn`}>
                                                    <div className={`flex items-start max-w-[80%]`}>
                                                        <Avatar className="w-8 h-8">
                                                            <AvatarFallback><Bot /></AvatarFallback>
                                                        </Avatar>
                                                        <Card className={`mx-2 w-[70%] bg-white`}>
                                                            <CardContent className="p-3">
                                                                <MarkdownChat content={message.parts[0].text} />
                                                            </CardContent>
                                                        </Card>
                                                    </div>
                                                </div>
                                        }
                                    </React.Fragment>
                                )
                            })
                        }
                        {
                            question &&
                            <div className={`flex justify-end mb-4 animate-fadeIn`}>
                                <div className={`flex items-start max-w-[80%] flex-row-reverse`}>
                                    <Avatar className="w-8 h-8">
                                        {
                                            user ? <img src={user?.imageUrl} alt="Avatar" /> : <User />
                                        }
                                    </Avatar>
                                    <Card className={`mx-2 w-[70%] bg-blue-500 text-white`}>
                                        <CardContent className="p-3 flex flex-col gap-4">
                                            {
                                                img.data &&
                                                <ImgLightBox className='w-[300px] h-[200px] rounded-lg' image={{ src: img.data, title: img.fileName }} />
                                            }
                                            <MarkdownChat content={question} />
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        }
                        {answer &&
                            <div className={`flex justify-start mb-4 animate-fadeIn`}>
                                <div className={`flex items-start max-w-[80%]`}>
                                    <Avatar className="w-8 h-8">
                                        <AvatarFallback><Bot /></AvatarFallback>
                                    </Avatar>
                                    <Card className={`mx-2 w-[70%] bg-white`}>
                                        <CardContent className="p-3">
                                            <MarkdownChat content={answer} />
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        }
                        <div className={img.data ? "pb-40" : "pb-24"} ref={endRef} />
                    </ScrollArea>
                </div>
            </div>
            <FormChat getChat={getChat} />
        </div >
    )
}

export default Chat