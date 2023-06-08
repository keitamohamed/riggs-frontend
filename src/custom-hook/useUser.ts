import {useAppDispatch} from "../setup/redux/reduxHook.ts";
import {userAction} from "../setup/redux/user.tsx";
import {GET_REQUEST} from "../api-endpoint/Request.ts";
import {APIPath} from "../api-endpoint/urlPath.ts";

export const useUser = () => {
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmYXlhbmdha2VpdGFAZ21haWwuY29tIiwicm9sZXMiOlsiUkVBRCIsIkRFTEVURSIsIlBPU1QiLCJVUERBVEUiLCJST0xFX0FETUlOIiwiUFVUIiwiV1JJVEUiXSwiaXNzIjoiL3JpZ2dzL2xvZ2luIiwiZXhwIjoxNjg2MDQ1ODQzLCJpYXQiOjE2ODU5NTk0NDN9.BFSI7wavfYlxCk8H1TQMBVyQe18d1m3vduP6_IhRGhY"
    const dispatch = useAppDispatch()
    // const {user} = useAppSelector((state) => state.user)


    const setUser = (user: object) => {
        dispatch(userAction.user(user))
    }
    const loadUsers = (data: any[]) => {
        dispatch(userAction.userList(data))
    }
    
    const findUserByID = (userID: number) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
        dispatch(GET_REQUEST(token, APIPath.FIND_USER_BY_ID(userID), setUser, setError))
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
    }
}