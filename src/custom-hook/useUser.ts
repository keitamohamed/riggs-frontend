import {useAppDispatch, useAppSelector} from "../setup/redux/reduxHook.ts";
import {userAction} from "../setup/redux/user.tsx";
import {GET_REQUEST, POST_REQUEST, PUT_REQUEST} from "../api-endpoint/Request.ts";
import {APIPath} from "../api-endpoint/urlPath.ts";
import {FormEvent, useContext} from "react";
import {AuthContext, UIActionContext} from "../setup/context/context.ts";

export const useUser = () => {
    const authCtx = useContext(AuthContext)
    const ctx = useContext(UIActionContext)
    const dispatch = useAppDispatch()
    const {user, update, booking} = useAppSelector((state) => state.user)

    const setUser = (user: object) => {
        dispatch(userAction.setUser(user))
        dispatch(userAction.setBooking(user))
    }
    const loadUsers = (data: any[]) => {
        dispatch(userAction.userList(data))
    }
    const onChangeSetNewUser = (event: any) => {
        dispatch(userAction.setNewUserInput(event.target))
    }
    const onChangeSetNewUserAddress = (event: any) => {
        dispatch(userAction.setNewUserAddress(event.target))
    }
    const onChangeSetNewUserAuth = (event: any) => {
        dispatch(userAction.setUserAuth(event.target))
    }
    const onChangeSetUpdate = (event: any) => {
        dispatch(userAction.setUpdate(event.target))
    }
    const onChangeSetUpdateAddress = (event: any) => {
        dispatch(userAction.setUpdateAddress(event.target))
    }
    const onChangeSetUpdateAuth = (event: any) => {
        dispatch(userAction.setUpdateAuth(event.target))
    }

    
    const findUserByID = (userID: number) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(GET_REQUEST(null, APIPath.FIND_USER_BY_ID(userID), setUser, setError))
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

    const onSubmitAddNewUser = async (event: any) => {
        event.preventDefault()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await dispatch(POST_REQUEST(APIPath.ADD_NEW_USER, user, setMessage, setInvalidInputError, null))
    }
    const onSubmitSendUpdate = async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await dispatch(PUT_REQUEST(authCtx.getCookie().aToken, APIPath.UPDATE_USER_INFO(user.userID), update, setMessage, setInvalidInputError))
        findUserByEmail(authCtx.getCookie().email)
        dispatch(userAction.reSetForm())
    }

    const onSubmitSendUpdateAuth = () => {
        console.log(update.auth)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(PUT_REQUEST(authCtx.getCookie().aToken, APIPath.UPDATE_USER_AUTH(update.auth.authID), update.auth, setMessage, setInvalidInputError))
        findUserByEmail(authCtx.getCookie().email)
        dispatch(userAction.reSetForm())
    }

    const userTotalBooking = () => {
        return booking.length
    }
    const setMessage = async (message: object) => {
        dispatch(userAction.setMessage(message))
    }

    const setError = (error: any) => {
        if (error?.status == 403 || error?.data.error?.includes('The token has expired') || (error.statusText === 'Unauthorized')) {
            authCtx.setExpiredToken({accessToken: '', role: '', email: '', })
            return
        }
        dispatch(userAction.setError(error?.data))
    }

    const setInvalidInputError = async (response: any) => {
        console.log(response)
        dispatch(userAction.setError(response))
        const {error: {address, firstName, lastName, phoneNum}} = response
        if (!address && !firstName && !lastName && !phoneNum) {
            if (!ctx.getShowAuth()) {
                dispatch(userAction.reSetError())
            }
            ctx.setShowAuth(true)
        }
    }

    return {
        userList,
        findUserByID,
        findUserByEmail,
        onChangeSetNewUser,
        onChangeSetNewUserAddress,
        onChangeSetNewUserAuth,
        onChangeSetUpdate,
        onChangeSetUpdateAddress,
        onChangeSetUpdateAuth,
        addNewUser: onSubmitAddNewUser,
        onSubmitSendUpdate,
        onSubmitSendUpdateAuth,
        userTotalBooking
    }
}