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
    file: { data: null, aiData: {}, fileName: "" },
    setFile: (newFile) => set((state) => ({ file: { ...state.file, ...newFile } })),
    isLoading: false,
    isChatting: false,
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
            set({ isChatting: true })
            const imgData = get().img?.aiData;
            const fileData = get().file?.aiData;
            const result = await get().chat.sendMessageStream(
                (imgData && Object.entries(imgData).length)
                    ? [text, imgData]
                    : (fileData && Object.entries(fileData).length)
                        ? [text, fileData]
                        : [text]
            );

            let textHistory = "";
            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                textHistory += chunkText;
                set({ answer: textHistory });
            }
            await addChatDB(
                get().dataChat?._id,
                isInitial ? "" : text,
                get().answer,
                get().img.data,
                get().file.data
            )

            set({
                question: "",
                answer: "",
                img: {
                    isLoading: false,
                    data: "",
                    aiData: {},
                    fileName: ""
                },
                file: {
                    data: null,
                    fileName: ""
                }
            })
            set({ isChatting: false })
        } catch (error) {
            console.log("Error during adding chat:", error.message);
        } finally {
            set({ isLoading: false })
        }
    }
}))
export default useChatStore