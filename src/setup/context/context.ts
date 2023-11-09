import {createContext} from "react";
import {
    AuthContextProperty,
    Credentials, CredentialsReset, DashboardContextProperty,
    ShowRoomDetail,
    UIHideShowContextProvider
} from "../../interface-type/interface-type.ts";


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

const dashboard: DashboardContextProperty = {
    getDisplayComponent: () => '',
    setDisplayComponentType: (toDisplay: string) => toDisplay,
    getFormType: () => '',
    setFormType: (toDisplay: string, actionType: string) => '',
}

export const AuthContext = createContext<AuthContextProperty>(auth)
export const DashboardContext = createContext<DashboardContextProperty>(dashboard)
export const UIActionContext = createContext<UIHideShowContextProvider>(uiDefaultProps)
export const RoomActionContext = createContext<ShowRoomDetail>(roomDetail)