import {createContext} from "react";
import {UIHideShowContextProvider} from "../../interface/interface.ts";


const uiDefaultProps = {
    getShowAuth: () => false,
    setShowAuth: () => '',
}
export const UIActionContext = createContext<UIHideShowContextProvider>(uiDefaultProps)