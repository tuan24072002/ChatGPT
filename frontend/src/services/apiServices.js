import axios from "axios";
const API_URL = import.meta.env.MODE === "development" ? "http://localhost:1234/api" : '/api';
const axiosService = axios.create({
    baseURL: API_URL,
    withCredentials: true
})
//Chat
export const createChat = (text, img) => {
    return axiosService.post("/chat", { text, img })
}
export const addChatDB = (_id, question, answer, img) => {
    return axiosService.put(`/chat/${_id}`, { question, answer, img })
}
export const getChatById = (_id) => {
    return axiosService.get(`/chat/${_id}`)
}

//User
export const getAllUserChat = () => {
    return axiosService.get(`/user/user-chat`)
}