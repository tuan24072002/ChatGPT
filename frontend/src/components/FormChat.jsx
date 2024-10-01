import { ArrowUp } from 'lucide-react';
import { useState } from 'react';
import { useAppContext } from '../context/UseContextCustom';
const FormChat = () => {
    const { setMessages } = useAppContext();
    const [text, setText] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text) return;
        setMessages((prev) => [...prev, { id: Math.random(), sender: 'user', content: text }, { id: Math.random(), sender: 'bot', content: "Haha" }]);
        setText('');
    }
    return (
        <form onSubmit={handleSubmit} className={`fixed bottom-0 w-full`}>
            <div className="flex items-center bg-gray-200 rounded-full gap-4 py-2 px-4 w-[50%] min-w-[356px] mx-auto">
                <img src="/PaperClip.svg" alt="Logo" className="size-7 cursor-pointer scale-x-[-1]" />
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className='flex-1 bg-transparent border-none outline-none'
                    placeholder='Tin nhắn ChatGPT' />
                <button type='submit' className={`p-2 rounded-full ${text ? "bg-black" : "bg-gray-300"}`}>
                    <ArrowUp className='cursor-pointer text-white' />
                </button>
            </div>
            <p className="text-center text-xs my-2 text-slate-500">ChatGPT có thể mắc lỗi. Hãy kiểm tra các thông tin quan trọng.</p>
        </form>
    )
}

export default FormChat