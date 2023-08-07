import {useContext} from "react";
import {AuthContext} from "../setup/context/context.ts";
import {useUser} from "./useUser.ts";

export const useGlobal = () => {
    const authCtx = useContext(AuthContext)
    const {findUserByEmail} = useUser()
    const reload = (arg: () => void, args: () => void) => {
        if ((window.performance.getEntries()[0] as PerformanceNavigationTiming).type == 'reload') {
           arg()
        } else {
            args()
        }
    }

    const setTimer = () => {
      // setInterval(() => findUserByEmail(authCtx.getCookie().email), 30000)
    }

    return {
        reload,
        setTimer
    }
}