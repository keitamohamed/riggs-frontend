import React, {useContext, useState} from "react";
import {useAppDispatch, useAppSelector} from "../setup/redux/reduxHook.ts";
import {bookingAction} from "../setup/redux/booking.ts";
import {DELETE_REQUEST, GET_REQUEST, POST_REQUEST} from "../api-endpoint/Request.ts";
import {APIPath, ContextType} from "../api-endpoint/url-context-type.ts";
import {AuthContext} from "../setup/context/context.ts";
import {useUser} from "./useUser.ts";

export const useBooking = () => {
    const authCtx = useContext(AuthContext)
    const dispatch = useAppDispatch()
    const {findUserByEmail} = useUser()
    const {booking} = useAppSelector((state) => state.booking)
    const {user, listUser} = useAppSelector((state) => state.user)

    const [dateRange, setDateRange] = useState([null, null])

    const setBookingList = (bookingList: any) => {
        dispatch(bookingAction.setBookingList(bookingList))
        dispatch(bookingAction.setRecentBook(listUser))
        // dispatch(bookingAction.setUserBooking(listUser))
    }

    const onChangeRoom = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(bookingAction.setNewBooking(event.target))
    }

    const onChange = () => {
        dispatch(bookingAction.setNewDate(dateRange))
    }

    const setReserveRoom = (id: number) => {
        dispatch(bookingAction.setReserveRoom({roomID: id}))
    }

    const loadingBookings = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(GET_REQUEST(authCtx.getCookie().aToken, APIPath.BOOKING_LIST, setBookingList, setError))

    }
    const bookRoom = () => {
        dispatch(bookingAction.setMessage({}))
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(POST_REQUEST(authCtx.getCookie().aToken, APIPath.NEW_BOOKING(user.userID), booking, setMessage, setError, ContextType.JSONFILE))
    }

    const deleteBooking = async (id: number) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await dispatch(DELETE_REQUEST(authCtx.getCookie().aToken, APIPath.DELETE_BOOKING(id), setMessage, setError))
        await findUserByEmail(user.auth.email)
    }

    const setError = (error: object) => {
        dispatch(bookingAction.setError(error))
    }

    const setMessage = (message: any) => {
        dispatch(bookingAction.setMessage(message))
        dispatch(bookingAction.reSetBooking())
    }

    return {
        onChangeRoom,
        onChange,
        setDateRange,
        dateRange,
        setReserveRoom,
        bookRoom,
        loadingBookings,
        deleteBooking
    }
}