import {useAppDispatch, useAppSelector} from "../setup/redux/reduxHook.ts";
import {bookingAction} from "../setup/redux/booking.ts";
import {useState} from "react";

export const useBooking = () => {
    const dispatch = useAppDispatch()
    const {booking, bookingList} = useAppSelector((state) => state.booking)

    const [dateRange, setDateRange] = useState([null, null])

    const onChangeRoom = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(bookingAction.setNewBooking(event.target))
    }

    const onChange = () => {
        dispatch(bookingAction.setNewDate(dateRange))
    }

    return {
        onChangeRoom,
        onChange,
        setDateRange,
        dateRange
    }
}