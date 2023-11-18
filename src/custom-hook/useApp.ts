import {useAppDispatch, useAppSelector} from "../setup/redux/reduxHook.ts";
import {GET_REQUEST} from "../api-endpoint/Request.ts";
import {APIPath} from "../api-endpoint/url-context-type.ts";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../setup/context/context.ts";
import {appAction} from "../setup/redux/app.ts";
import {ChartMonthlyProgress, Exchange} from "../type-dt/type-dt.ts";
import {useUser} from "./useUser.ts";

export const useApp = () => {
    const {userList} = useUser()

    const authCtx = useContext(AuthContext)
    const dispatch = useAppDispatch()
    const {room: {rooms}, user: {listUser}} = useAppSelector((state) => state)

    const [loaded, setLoaded] = useState<boolean>(false)
    
    const checkDatabaseHealth = async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await dispatch(GET_REQUEST(authCtx.getCookie().aToken, APIPath.APP_HEALTH, setDatabaseHealth, setHealthError, true))

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await dispatch(GET_REQUEST(authCtx.getCookie().aToken, APIPath.APP_HTTP_EXCHANGES, setExchange, setHealthError, true))
    }

    const fetchMonthlyProgress = async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await dispatch(GET_REQUEST(authCtx.getCookie().aToken, APIPath.MONTHLY_PROGRESS, setMonthlyProgress, setError, false))

    }

    const setMonthlyProgress = (monthlyProgress: ChartMonthlyProgress) => {
        dispatch(appAction.setMonthlyProgress(monthlyProgress))
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

    const setError = (error: any) => {
        dispatch(appAction.setError(error))
    }


    useEffect(() => {
        if (!loaded) {
            initLoadData()
            fetchMonthlyProgress()
            setLoaded(true)
        }
    }, [loaded])

    return {
        checkDatabaseHealth,
        getNumberOfRoom,
        getNumberUsers
    }
}