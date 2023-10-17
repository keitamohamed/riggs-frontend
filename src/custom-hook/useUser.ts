import {useAppDispatch, useAppSelector} from "../setup/redux/reduxHook.ts";
import {userAction} from "../setup/redux/user.ts";
import {DOWNLOAD_EXCEL_FILE, GET_REQUEST} from "../api-endpoint/Request.ts";
import {APIPath} from "../api-endpoint/urlPath.ts";
import {useContext} from "react";
import {AuthContext} from "../setup/context/context.ts";
import {bookingAction} from "../setup/redux/booking.ts";
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
        dispatch(bookingAction.setRecentBook(data))
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
        dispatch(GET_REQUEST(authCtx.getCookie().aToken, APIPath.LOAD_USERS, loadUsers, setError))
    }
    
    const setMessage = (message: any) => {
        dispatch(userAction.setMessage(message))
    }

    const setError = (error: any) => {
        if (error?.status == 403 || error?.data.error?.includes('The token has expired') || (error.statusText === 'Unauthorized')) {
            authCtx.setExpiredToken({accessToken: '', role: '', email: '', })
            return
        }
        dispatch(userAction.setError(error?.data))
    }

    const onClickGenerateUserExcelFile = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(DOWNLOAD_EXCEL_FILE(authCtx.getCookie().aToken, APIPath.USER_EXCEL_FILE, null, setMessage, setError))
    }

    const userTotalBooking = () => {
        return booking.length
    }

    return {
        userList,
        findUserByID,
        findUserByEmail,
        userTotalBooking,
        onClickGenerateUserExcelFile
    }
}