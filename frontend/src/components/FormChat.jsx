import { ArrowUp } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useChatStore from '../store/useChatStore';
import { createChat, getChatById } from '../services/apiServices';
import { useAppContext } from '../context/UseContextCustom';

const FormChat = ({ getChat }) => {
    const [text, setText] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const { addChat, img, setDataChat, isLoading } = useChatStore();
    const { fetchDataChatList } = useAppContext();
    const getChatNew = async (chatId) => {
        const res = await getChatById(chatId);
        setDataChat(res.data)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text) return;
        if (location.pathname === "/") {
            const res = await createChat(text, img.dbData?.url);
            if (res.data) {
                navigate(`/chat/${res.data}`);
                await addChat(text, true);
                await fetchDataChatList();
                await getChatNew(res.data);
            }
        } else {
            await addChat(text, false);
            await getChat();
        }
        setText("");
    }
    return (
        <form onSubmit={handleSubmit} className={`fixed bottom-0 w-full`}>
            <div className="flex items-center bg-gray-200 rounded-full gap-4 py-2 px-4 w-[50%] min-w-[356px] mx-auto">
                <img src="/PaperClip.svg" alt="Logo" className="size-7 cursor-pointer scale-x-[-1]" />
                <input
                    disabled={isLoading}
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className='flex-1 bg-transparent border-none outline-none disabled:cursor-not-allowed'
                    placeholder='Tin nhắn ChatGPT' />
                <button type='submit' disabled={isLoading} className={`p-2 rounded-full disabled:cursor-not-allowed ${text ? "bg-black" : "bg-gray-300"}`}>
                    <ArrowUp className='text-white' />
                </button>
            </div>
            <p className="text-center text-xs my-2 text-slate-500">ChatGPT có thể mắc lỗi. Hãy kiểm tra các thông tin quan trọng.</p>
        </form>
    )
}

export default FormChat