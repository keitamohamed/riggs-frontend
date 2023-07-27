import {useAppDispatch, useAppSelector} from "../setup/redux/reduxHook.ts";
import {userAction} from "../setup/redux/user.tsx";
import {GET_REQUEST, POST_REQUEST} from "../api-endpoint/Request.ts";
import {APIPath} from "../api-endpoint/urlPath.ts";
import {useContext} from "react";
import {UIActionContext} from "../setup/context/context.ts";

export const useUser = () => {
    const ctx = useContext(UIActionContext)
    const dispatch = useAppDispatch()
    const {credentials} = useAppSelector((state) => state.auth)
    const {user, error, error: {address}, booking} = useAppSelector((state) => state.user)

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

    
    const findUserByID = (userID: number) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
        dispatch(GET_REQUEST(token, APIPath.FIND_USER_BY_ID(userID), setUser, setError))
    }

    const findUserByEmail = (email: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(GET_REQUEST(credentials.accessToken, APIPath.FIND_USER_BY_EMAIL(email), setUser, setError))
    }
    
    const userList = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
        dispatch(GET_REQUEST(token, APIPath.LOAD_USERS, loadUsers, setError))
    }

    const addNewUser = async (event: any) => {
        event.preventDefault()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await dispatch(POST_REQUEST(APIPath.ADD_NEW_USER, user, setValidInputMessage, setInvalidInputError, null))
    }

    const userTotalBooking = () => {
        return booking.length
    }
    const setMessage = async (message: object) => {
        dispatch(userAction.setMessage(message))
    }
    const setValidInputMessage = async (message: object) => {
        await dispatch(userAction.setMessage(message))
    }

    const setError = (error: object) => {
        dispatch(userAction.setError(error))
    }

    const setInvalidInputError = async (response: any) => {
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
        addNewUser,
        userTotalBooking
    }
}