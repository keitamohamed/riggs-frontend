import {useAppDispatch, useAppSelector} from "../setup/redux/reduxHook.ts";
import {GET_REQUEST} from "../api-endpoint/Request.ts";
import {APIPath} from "../api-endpoint/url-context-type.ts";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../setup/context/context.ts";
import {appAction} from "../setup/redux/app.ts";
import {Exchange} from "../interface-type/interface-type.ts";
import {useUser} from "./useUser.ts";

export const useApp = () => {
    const {userList} = useUser()

    const authCtx = useContext(AuthContext)
    const dispatch = useAppDispatch()
    const {room: {rooms}, user: {listUser}} = useAppSelector((state) => state)
    const {database, exchanges} = useAppSelector((state) => state.app)

    const [loaded, setLoaded] = useState<boolean>(false)
    
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
    
    const getNumberUsers = () => {
        return listUser.length
    }

    const getNumberOfRoom = () : number => {
        return rooms.length
    }

    const setExchange = (exchange: Exchange) => {
        dispatch(appAction.resetChartData())
        dispatch(appAction.setExchange(exchange));
        dispatch(appAction.setChartData(exchange))
        dispatch(appAction.setTraces(exchange))
    }
    const setHealthError = (error: any) => {
        dispatch(appAction.setError(error))
    }

    const initLoadData = () => {
        userList()
    }


    useEffect(() => {
        if (!loaded) {
            initLoadData()
            setLoaded(true)
        }
    }, [loaded])

    return {
        checkDatabaseHealth,
        getNumberOfRoom,
        getNumberUsers
    }
}