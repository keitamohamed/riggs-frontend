import {useAppDispatch, useAppSelector} from "../setup/redux/reduxHook.ts";
import {roomAction} from "../setup/redux/room.ts";
import {Room} from "../interface-type/interface-type.ts";
import {DELETE_REQUEST, GET_REQUEST, POST_REQUEST, PUT_REQUEST} from "../api-endpoint/Request.ts";
import {APIPath, ContextType} from "../api-endpoint/url-context-type.ts";
import {useContext} from "react";
import {AuthContext, DashboardContext} from "../setup/context/context.ts";
import {useFile} from "./useFile.ts";

export const useRoom = () => {
    const dashCtx = useContext(DashboardContext)
    const {uploadFile} = useFile()

    const authCtx = useContext(AuthContext)
    const dispatch = useAppDispatch()
    const {room, rooms} = useAppSelector((state) => state.room)

    const setSelectedRoom = (room: Room) => {
      dispatch(roomAction.setRoom(room))
    }
    const setRooms = (rooms: Room) => {
      dispatch(roomAction.setRooms(rooms))
    }

    const setMessage = (message: any) => {
      dispatch(roomAction.setMessage(message))
    }

    const setError = (error: object) => {
        dispatch(roomAction.setError(error))
    }

    const getRoomByName = (strValue: string) : Room[] => {
        return (rooms.filter(room => room.roomName.toLowerCase().includes(strValue.toLowerCase())))
    }

    const getRoomByID = (id: number) : Room[] => {
        return rooms.filter(room => room.roomID === id)
    }

    const loadRoom = async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await dispatch(GET_REQUEST(null, APIPath.ROOM_LIST, setRooms, setError))
    }

    const onSubmit = async (event: any) => {
        event.preventDefault()
        if (dashCtx.getFormType().actionType === 'Update') {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            await dispatch(PUT_REQUEST(authCtx.getCookie().aToken, APIPath.UPDATE_ROOM(room.roomID), room, setMessage, setError))
            await loadRoom()
            return
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await dispatch(POST_REQUEST(authCtx.getCookie().aToken, APIPath.ADD_ROOM, room, setMessage, setError, ContextType.JSONFILE))
        await loadRoom()
    }
    
    const onClickDeleteRoom = async (roomID: number) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await dispatch(DELETE_REQUEST(authCtx.getCookie().aToken, APIPath.DELETE_ROOM(roomID), setMessage, setError))
        await loadRoom()
    }

    
    return {
        loadRoom,
        onSubmit,
        getRoomByName,
        getRoomByID,
        setSelectedRoom,
        onClickDeleteRoom
    }
}