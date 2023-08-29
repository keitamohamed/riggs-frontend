import {useAppDispatch, useAppSelector} from "../setup/redux/reduxHook.ts";
import {roomAction} from "../setup/redux/room.ts";
import {Room} from "../interface/interface.ts";
import {GET_REQUEST, POST_REQUEST} from "../api-endpoint/Request.ts";
import {APIPath} from "../api-endpoint/urlPath.ts";
import {useContext} from "react";
import {AuthContext} from "../setup/context/context.ts";

export const useRoom = () => {
    const authCtx = useContext(AuthContext)
    const dispatch = useAppDispatch()
    const {room} = useAppSelector((state) => state.room)

    const setRooms = (rooms: Room) => {
      dispatch(roomAction.setRooms(rooms))
    }

    const setMessage = (message: any) => {
      dispatch(roomAction.setMessage(message))
    }

    const setError = (error: object) => {
        dispatch(roomAction.setError(error))
    }

    const loadRoom = async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await dispatch(GET_REQUEST(null, APIPath.ROOM_LIST, setRooms, setError))
    }

    const onSubmit = async (event: any) => {
        event.preventDefault()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await dispatch(POST_REQUEST(authCtx.getCookie().aToken, APIPath.ADD_ROOM, room, setMessage, setError))
    }

    return {
        loadRoom,
        onSubmit
    }
}