import { createContext, useCallback, useState } from "react";
import { getAllUserChat } from "../services/apiServices";

export const Context = createContext();

export const ContextProvider = (props) => {
    const [openSidebar, setOpenSidebar] = useState(true)
    const [chatList, setChatList] = useState([])
    const fetchDataChatList = useCallback(async () => {
        const res = await getAllUserChat()
        setChatList(res.data)
    }, [])
    const contextValue = {
        openSidebar,
        setOpenSidebar,
        chatList,
        fetchDataChatList
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}