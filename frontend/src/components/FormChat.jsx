import { ArrowUp, X } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useChatStore from '../store/useChatStore';
import { createChat, getChatById } from '../services/apiServices';
import { useAppContext } from '../context/UseContextCustom';
import { Image as ImgLightBox } from "lightbox.js-react"
const FormChat = ({ getChat }) => {
    const [text, setText] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const { addChat, img, setDataChat, isLoading, setImg } = useChatStore();
    const { fetchDataChatList, setImagePreview } = useAppContext();
    const getChatNew = async (chatId) => {
        const res = await getChatById(chatId);
        setDataChat(res.data)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text) return;
        if (location.pathname === "/") {
            const res = await createChat(text, img.data);
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
    const handleFileChange = (e) => {
        setImg({ isLoading: true });
        const file = e.target.files[0];
        console.log(file);

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                const base64 = reader.result;
                setImg({
                    isLoading: false,
                    data: base64,
                    aiData: {
                        inlineData: {
                            data: base64.split(",")[1],
                            mimeType: file.type,
                        }
                    },
                    fileName: file.name
                });
            }
        }
    }
    return (
        <form onSubmit={handleSubmit} className={`fixed bottom-0 w-full flex flex-col`}>
            <div className="bg-gray-200 rounded-3xl w-[50%] min-w-[356px] mx-auto">
                {
                    img.isLoading ? <>Loading...</> :
                        img.data &&
                        <div onClick={() => setImagePreview(img.data)} className='w-full h-20 mx-auto cursor-pointer group flex items-center justify-center'>
                            <div className='border-2 border-transparent group-hover:border-gray-300 rounded-md flex items-center gap-2 py-2 px-4 relative'>
                                <ImgLightBox className='size-10' image={{ src: img.data, title: img.fileName }} />
                                <p>{img.fileName}</p>
                                <X className='size-4 absolute right-0 top-0 hover:text-red-500' onClick={() => setImg({ data: "", aiData: {}, fileName: "" })} />
                            </div>
                        </div>
                }
                <div className='flex items-center gap-4 py-2 px-4'>
                    <label htmlFor='img'>
                        <img src="/PaperClip.svg" alt="Logo" className="size-7 cursor-pointer scale-x-[-1]" />
                        <input type="file" id='img' disabled={isLoading} hidden onChange={handleFileChange} />
                    </label>
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
            </div>
            <p className="text-center text-xs my-2 text-slate-500">ChatGPT có thể mắc lỗi. Hãy kiểm tra các thông tin quan trọng.</p>
        </form>
    )
}

export default FormChat