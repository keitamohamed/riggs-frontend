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
    showDetail: () => 0
}

const auth = {
    getCookie: ()  => '',
    logout: () => null,
    setCredentials: (useCredential: Credentials) => useCredential,
    setExpiredToken: (resetCredential: CredentialsReset) => resetCredential,
    isAuthenticated:() => false,
    isAdmin: () => false
}

export const AuthContext = createContext<AuthContextProperty>(auth)
export const UIActionContext = createContext<UIHideShowContextProvider>(uiDefaultProps)
export const RoomActionContext = createContext<ShowRoomDetail>(roomDetail)