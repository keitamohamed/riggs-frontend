import {useAppDispatch, useAppSelector} from "../setup/redux/reduxHook.ts";
import {userAction} from "../setup/redux/user.tsx";
import {GET_REQUEST} from "../api-endpoint/Request.ts";
import {APIPath} from "../api-endpoint/urlPath.ts";
import {useContext} from "react";
import {AuthContext} from "../setup/context/context.ts";

export const useUser = () => {
    const authCtx = useContext(AuthContext)
    const dispatch = useAppDispatch()
    const {booking} = useAppSelector((state) => state.user)

    const setUser = (user: object) => {
        dispatch(userAction.setUser(user))
        dispatch(userAction.setBooking(user))
    }
    const loadUsers = (data: any[]) => {
        dispatch(userAction.userList(data))
    }

    
    const findUserByID = (userID: number) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(GET_REQUEST(authCtx.getCookie().aToken, APIPath.FIND_USER_BY_ID(userID), setUser, setError))
    }

    const findUserByEmail = (email: string) => {
        if (email && authCtx.getCookie().aToken) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            dispatch(GET_REQUEST(authCtx.getCookie().aToken, APIPath.FIND_USER_BY_EMAIL(email), setUser, setError))
        }
    }
    
    const userList = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
        dispatch(GET_REQUEST(token, APIPath.LOAD_USERS, loadUsers, setError))
    }

    const userTotalBooking = () => {
        return booking.length
    }

    const setError = (error: any) => {
        if (error?.status == 403 || error?.data.error?.includes('The token has expired') || (error.statusText === 'Unauthorized')) {
            authCtx.setExpiredToken({accessToken: '', role: '', email: '', })
            return
        }
        dispatch(userAction.setError(error?.data))
    }

    return {
        userList,
        findUserByID,
        findUserByEmail,
        userTotalBooking
    }
}