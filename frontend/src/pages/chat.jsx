import { useParams } from "react-router-dom"
import React, { useCallback, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, User } from "lucide-react";
import FormChat from "../components/FormChat";
import MarkdownChat from "../components/MarkdownChat";
import useChatStore from "../store/useChatStore";
import { getChatById } from "../services/apiServices";
import { useUser } from "@clerk/clerk-react"

const Chat = () => {
    const { setDataChat, dataChat, answer, question, img } = useChatStore();
    const endRef = useRef(null);
    const { user } = useUser();
    const { chatId } = useParams();
    const getChat = useCallback(async () => {
        const res = await getChatById(chatId);
        setDataChat(res.data)
    }, [chatId, setDataChat])
    useEffect(() => {
        getChat();
    }, [getChat])
    useEffect(() => {
        endRef?.current.scrollIntoView({ behavior: "smooth" })
    }, [dataChat, answer, question, img.dbData])
    // const hasRun = useRef(false)
    // useEffect(() => {
    //     if (!hasRun.current) {
    //         if (dataChat?.history?.length === 1) {
    //             addChat(dataChat.history[0].parts[0].text, true)
    //         }
    //     }
    //     hasRun.current = true
    // }, [addChat, dataChat])
    {/* {
 message.img && <img
     src={import.meta.env.VITE_IMAGE_KIT_ENDPOINT + message.img}
      alt=""
     width={400}
     height={300} />
  } */}
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
                                                            <AvatarFallback><img src={user?.imageUrl} alt="Avatar" /></AvatarFallback>
                                                        </Avatar>
                                                        <Card className={`mx-2 w-[70%] bg-blue-500 text-white`}>
                                                            <CardContent className="p-3">
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
                                        <AvatarFallback><User /></AvatarFallback>
                                    </Avatar>
                                    <Card className={`mx-2 w-[70%] bg-blue-500 text-white`}>
                                        <CardContent className="p-3">
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

                        <div className="pb-24" ref={endRef} />
                    </ScrollArea>
                </div>
            </div>
            <FormChat getChat={getChat} />
        </div>
    )
}

export default Chat