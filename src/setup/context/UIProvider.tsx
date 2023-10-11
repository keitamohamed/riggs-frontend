import {Props} from "../../interface/interface-type.ts";
import {useState} from "react";

import {UIActionContext} from "./context.ts";

const {Provider} = UIActionContext
const UIContextProvider = ({children}: Props) => {
    const [showAuth, setAuth] = useState(false)
    const [rooms, setRooms] = useState(false)

    const setShowAuth = (value: boolean) => {
        setAuth(value)
    }
    const getShowAuth = () => {
        return showAuth
    }
    
    const setShowRooms = (value: boolean) => {
        setRooms(value)
    }
    
    const getShowRooms = () => {
        return rooms
    }


    return (
        <Provider value={{
            setShowAuth,
            getShowAuth,
            setShowRooms,
            getShowRooms
        }}>
            {children}
        </Provider>
    )
}

export default UIContextProvider