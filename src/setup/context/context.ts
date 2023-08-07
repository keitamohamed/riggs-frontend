import {createContext} from "react";
import {
    AuthContextProperty,
    Credentials, CredentialsReset,
    ShowRoomDetail,
    UIHideShowContextProvider
} from "../../interface/interface.ts";


const uiDefaultProps = {
    getShowAuth: () => false,
    setShowAuth: () => '',
    setShowRooms: () =>'',
    getShowRooms: () => false,
}

const roomDetail = {
    setShowDetail: () => false,
    getShowDetail: () => false
}

const auth = {
    getCookie: ()  => '',
    logout: () => null,
    setCredentials: (useCredential: Credentials) => useCredential,
    setExpiredToken: (resetCredential: CredentialsReset) => resetCredential
}

export const AuthContext = createContext<AuthContextProperty>(auth)
export const UIActionContext = createContext<UIHideShowContextProvider>(uiDefaultProps)
export const RoomActionContext = createContext<ShowRoomDetail>(roomDetail)