import {useEffect} from "react";
import {useUser} from "../../custom-hook/useUser.ts";

export const User = () => {
    const {userList} = useUser()

    useEffect(() => {
        userList()

    }, [userList])
    return (
        <>
        </>
    )
}