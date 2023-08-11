import React, {useContext, useState} from "react";
import {useAppDispatch, useAppSelector} from "../setup/redux/reduxHook.ts";
import {bookingAction} from "../setup/redux/booking.ts";
import {POST_REQUEST} from "../api-endpoint/Request.ts";
import {APIPath} from "../api-endpoint/urlPath.ts";
import {AuthContext} from "../setup/context/context.ts";
import {useUser} from "./useUser.ts";

export const useBooking = () => {
    const authCtx = useContext(AuthContext)
    const dispatch = useAppDispatch()
    const {booking} = useAppSelector((state) => state.booking)
    const {user} = useAppSelector((state) => state.user)

    const [book, setBook] = useState({
        bookingID: 0,
        bookDate: new Date(),
        arrDate: new Date(),
        depDate: new Date(),
        numRoom: 0,
        numAdult: 0,
        numChildren: 0,
        user,
        rooms: [567271, 1537181
        ]
    })

    const [dateRange, setDateRange] = useState([null, null])

    const onChangeRoom = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(bookingAction.setNewBooking(event.target))
    }

    const onChange = () => {
        dispatch(bookingAction.setNewDate(dateRange))
    }

    const setReserveRoom = (id: number) => {
        dispatch(bookingAction.setReserveRoom({roomID: id}))
    }

    const bookRoom = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(POST_REQUEST(authCtx.getCookie().aToken, APIPath.NEW_BOOKING(user.userID), booking, setMessage, setError))
        dispatch(bookingAction.reSetBooking())
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
        setReserveRoom,
        bookRoom
    }
}