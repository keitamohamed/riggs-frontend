import {useAppDispatch, useAppSelector} from "../setup/redux/reduxHook.ts";
import {bookingAction} from "../setup/redux/booking.ts";
import {useState} from "react";
import {POST_REQUEST} from "../api-endpoint/Request.ts";
import {APIPath} from "../api-endpoint/urlPath.ts";

export const useBooking = () => {
    const dispatch = useAppDispatch()
    const {booking, bookingList} = useAppSelector((state) => state.booking)
    const {user} = useAppSelector((state) => state.user)

    const [dateRange, setDateRange] = useState([null, null])

    const onChangeRoom = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(bookingAction.setNewBooking(event.target))
    }

    const onChange = () => {
        dispatch(bookingAction.setNewDate(dateRange))
    }

    const setReserveRoom = (id: number) => {
        dispatch(bookingAction.setReserveRoom(id))
    }

    const bookRoom = (di: number) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(POST_REQUEST(APIPath.NEW_BOOKING(user.userID), booking, setMessage, setError, null))
    }

    const setError = (error: object) => {
        dispatch(bookingAction.setError(error))
    }

    const setMessage = (message: object) => {
        dispatch(bookingAction.setMessage(message))
    }

    return {
        onChangeRoom,
        onChange,
        setDateRange,
        dateRange,
        setReserveRoom
    }
}