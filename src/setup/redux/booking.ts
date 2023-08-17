import {createSlice} from "@reduxjs/toolkit";
import {BookingInit} from "../../interface/interface.ts";

const user = {
         userID: 0,
         firstName: "",
         lastName: "",
         phoneNum: "",
         address: {
             street: "",
             city: "",
             state: "",
             zipcode: ""
         },
         auth: {
             email: "",
             password: "",
             role: ""
         }
}

const booking = {
    bookingID: 0,
    bookDate: new Date(),
    arrDate: new Date(),
    depDate: new Date(),
    numRoom: 0,
    numAdult: 0,
    numChildren: 0,
    user,
    rooms: []
}

const initialState: BookingInit = {
    booking: {
        bookingID: 0,
        bookDate: new Date(),
        arrDate: new Date(),
        depDate: new Date(),
        numRoom: 0,
        numAdult: 0,
        numChildren: 0,
        user,
        rooms: []
    },
    bookingList: [],
    message: {},
    error: {}
}

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setNewBooking(state, action) {
            const booking = action.payload
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            state.booking[booking.name as keyof object] = booking.value
        },
        setNewDate(state, action) {
            const startDate = action.payload[0]
            const endDate = action.payload[1]
                if (startDate && endDate) {
                    state.booking.arrDate = new Date(startDate)
                    state.booking.depDate = new Date(endDate)
                } else if (startDate){
                    state.booking.arrDate = new Date(endDate)
                }
        },
        reSetBooking(state ) {
            state.booking = booking
        },
        setMessage(state, action) {
            state.message = action.payload
        },
        reSetMessage(state) {
            state.message = {}
        },
        setError(state, action) {
            state.error = action.payload
        },
        reSetError(state) {
            state.error = {}
        },
        setReserveRoom(state, action) {
            state.booking.rooms.push(action.payload)
        }

    },
})

export const bookingAction = bookingSlice.actions;
export default bookingSlice