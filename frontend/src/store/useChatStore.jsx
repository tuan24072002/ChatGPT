import { create } from 'zustand'
import model from '../lib/gemini';
import { addChatDB } from '../services/apiServices';

const useChatStore = create((set, get) => ({
    answer: "",
    setAnswer: (answer) => set({ answer }),
    question: "",
    setQuestion: (question) => set({ question }),
    dataChat: {},
    setDataChat: (data) => set({ dataChat: data }),
    img: { isLoading: false, data: "", aiData: {}, fileName: "" },
    setImg: (newImg) => set((state) => ({ img: { ...state.img, ...newImg } })),
    isLoading: false,

    chat: model.startChat({
        history: [
            {
                role: "user",
                parts: [{ text: "Hello, I have 2 dogs in my house." }],
            },
            {
                role: "model",
                parts: [{ text: "Great to meet you. What would you like to know?" }],
            },
        ],
        generationConfig: {
            temperature: 1,
            topP: 0.95,
            topK: 64,
            maxOutputTokens: 8192,
            responseMimeType: "text/plain",
        },
    }),
    addChat: async (text, isInitial) => {
        set({ isLoading: true })
        if (!isInitial) set({ question: text })
        try {
            const result = await get().chat.sendMessageStream(
                Object.entries(get().img.aiData).length ? [get().img.aiData, text] : [text]
            )
            let textHistory = "";
            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                textHistory += chunkText;
                set({ answer: textHistory });
            }
            await addChatDB(
                get().dataChat?._id,
                get().question || undefined,
                get().answer,
                get().img.data || undefined
            )
            set({ question: "", answer: "", img: { isLoading: false, data: "", aiData: {}, fileName: "" } })
        } catch (error) {
            console.log("Error during adding chat", error.message);
        } finally {
            set({ isLoading: false })
        }
    }
}))
export default useChatStore