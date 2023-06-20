import {Props} from "../../interface/interface.ts";
import {useState} from "react";

import {UIActionContext} from "./context.ts";

const {Provider} = UIActionContext
const UIContextProvider = ({children}: Props) => {
    const [showAuth, setAuth] = useState(false)

    const setShowAuth = (value: boolean) => {
        setAuth(value)
    }
    const getShowAuth = () => {
        return showAuth
    }


    return (
        <Provider value={{
            setShowAuth,
            getShowAuth
        }}>
            {children}
        </Provider>
    )
}

export default UIContextProvider