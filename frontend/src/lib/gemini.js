import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai'

const safetySetting = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
];

const genAI = new GoogleGenerativeAI("AIzaSyCtqNJiEKkxN24QSP8WQ648gHoCiqDN1hk");

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safetySetting });

export default model