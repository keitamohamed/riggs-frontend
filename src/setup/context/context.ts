import {createContext} from "react";
import {
    AuthContextProperty,
    Credentials,
    ShowRoomDetail,
    UIHideShowContextProvider
} from "../../interface/interface.ts";


const uiDefaultProps = {
    getShowAuth: () => false,
    setShowAuth: () => '',
}

const roomDetail = {
    setShowDetail: () => false,
    getShowDetail: () => false
}

const auth = {
    getCookie: ()  => '',
    logout: () => null,
    setCredentials: (useCredential: Credentials) => useCredential,
}

export const AuthContext = createContext<AuthContextProperty>(auth)
export const UIActionContext = createContext<UIHideShowContextProvider>(uiDefaultProps)
export const RoomActionContext = createContext<ShowRoomDetail>(roomDetail)