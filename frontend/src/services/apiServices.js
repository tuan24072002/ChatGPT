import axios from "axios";
const API_URL = import.meta.env.MODE === "development" ? "http://localhost:1234/api" : '/api';
const axiosService = axios.create({
    baseURL: API_URL,
    withCredentials: true
})
//Chat
export const createChat = (text, img, file) => {
    const formData = new FormData();
    if (file) {
        formData.append("file", file);
        formData.append("text", text);
        formData.append("img", img);

        return axiosService.post("/chat", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }
    return axiosService.post("/chat", { text, img })
}
export const addChatDB = (_id, question, answer, img, file) => {
    const formData = new FormData();
    if (file) {
        formData.append("file", file);
        formData.append("question", question);
        formData.append("answer", answer);
        return axiosService.put(`/chat/${_id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    } else {
        return axiosService.put(`/chat/${_id}`, { question, answer, img, file });
    }
}
export const getChatById = (_id) => {
    return axiosService.get(`/chat/${_id}`)
}

//User
export const getAllUserChat = () => {
    return axiosService.get(`/user/user-chat`)
}
export const deleteUserChat = (chatId) => {
    return axiosService.delete(`/user/${chatId}`)
}
//Download File
export const downloadFile = (fileUrl) => {
    return axiosService.get(fileUrl, {
        responseType: 'blob',
    })
}