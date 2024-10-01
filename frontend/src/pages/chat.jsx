// import { useParams } from "react-router-dom"
import { useEffect, useRef } from "react";
import { useAppContext } from "../context/UseContextCustom";
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, User } from "lucide-react";
import FormChat from "../components/FormChat";
import MarkdownChat from "../components/MarkdownChat";


const Chat = () => {
    const { messages } = useAppContext();
    const endRef = useRef(null)
    // const { chatId } = useParams();
    useEffect(() => {
        endRef?.current.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <div className="flex-1 w-full h-full flex flex-col items-center">
            <div className="w-[90%] lg:w-[70%] h-full container mx-auto">
                <div className="flex-1 flex flex-col h-screen overflow-hidden">
                    <ScrollArea className="flex-1 p-4">
                        {messages.map((msg) => {
                            return (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4 animate-fadeIn`}>
                                    <div className={`flex items-start max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                        <Avatar className="w-8 h-8">
                                            <AvatarFallback>{msg.sender === 'user' ? <User /> : <Bot />}</AvatarFallback>
                                        </Avatar>
                                        <Card className={`mx-2 w-[70%] ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white'}`}>
                                            <CardContent className="p-3">
                                                <MarkdownChat content={msg.content} />
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            )
                        })}
                        <div className="pb-24" ref={endRef} />
                    </ScrollArea>
                </div>
            </div>
            <FormChat />
        </div>
    )
}

export default Chat