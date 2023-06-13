import {useAppDispatch, useAppSelector} from "../setup/redux/reduxHook.ts";
import {userAction} from "../setup/redux/user.tsx";
import {GET_REQUEST} from "../api-endpoint/Request.ts";
import {APIPath} from "../api-endpoint/urlPath.ts";

export const useUser = () => {
    const dispatch = useAppDispatch()
    const {credentials} = useAppSelector((state) => state.auth)
    // const {user} = useAppSelector((state) => state.user)


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

    const setError = (error: object) => {
        dispatch(userAction.setError(error))
    }

    return {
        userList,
        findUserByID,
        findUserByEmail
    }
}