import {useAppDispatch, useAppSelector} from "../setup/redux/reduxHook.ts";
import {GET_REQUEST} from "../api-endpoint/Request.ts";
import {APIPath} from "../api-endpoint/urlPath.ts";
import {useContext} from "react";
import {AuthContext} from "../setup/context/context.ts";
import {appAction} from "../setup/redux/app.ts";
import {Exchange} from "../interface/interface.ts";

export const useApp = () => {
    const authCtx = useContext(AuthContext)
    const dispatch = useAppDispatch()

    const {database} = useAppSelector((state) => state.app)
    
    const checkDatabaseHealth = async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await dispatch(GET_REQUEST(authCtx.getCookie().aToken, APIPath.APP_HEALTH, setDatabaseHealth, setHealthError, true))

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await dispatch(GET_REQUEST(authCtx.getCookie().aToken, APIPath.APP_HTTPEXCHANGES, setExchange, setHealthError, true))
    }

    const setDatabaseHealth = (health: any) => {
        dispatch(appAction.setDatabaseHealth(health))
    }

    const setExchange = (exchange: Exchange) => {
        dispatch(appAction.resetChartData())
        dispatch(appAction.setExchange(exchange));
        dispatch(appAction.setChartData(exchange))
    }
    const setHealthError = (error: any) => {
        dispatch(appAction.setError(error))
    }

    return {
        checkDatabaseHealth
    }
}