import { useContext } from "react";
import { Context } from "./AppContext";

export const useAppContext = () => {
    return useContext(Context);
}
