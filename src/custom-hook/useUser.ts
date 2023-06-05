import {useAppDispatch, useAppSelector} from "../setup/redux/reduxHook.ts";
import {userAction} from "../setup/redux/user.tsx";

export const useUser = () => {

    const dispatch = useAppDispatch()
    const {user} = useAppSelector((state) => state.user)


    const loadUsers = (data: any[]) => {
        dispatch(userAction.userList(data))
    }
}