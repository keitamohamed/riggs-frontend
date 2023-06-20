import {useAppDispatch} from "../setup/redux/reduxHook.ts";
import {roomAction} from "../setup/redux/room.ts";
import {Room} from "../interface/interface.ts";
import {GET_REQUEST} from "../api-endpoint/Request.ts";
import {APIPath} from "../api-endpoint/urlPath.ts";

export const useRoom = () => {
    const dispatch = useAppDispatch()
    const setRooms = (rooms: Room) => {
      dispatch(roomAction.setRooms(rooms))
    }

    const setError = (error: object) => {
        dispatch(roomAction.setError(error))
    }

    const loadRoom = async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await dispatch(GET_REQUEST(null, APIPath.ROOM_LIST, setRooms, setError))
    }
    return {
        loadRoom
    }
}