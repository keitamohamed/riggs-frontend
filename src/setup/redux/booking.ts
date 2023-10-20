import {createSlice} from "@reduxjs/toolkit";
import {Booking, BookingInit, BookingPrice, User} from "../../interface/interface-type.ts";
import {RecentBook} from "../../component/reusable/recent-book.tsx";


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
    },
    book: []
}


const booking = {
    bookingID: 0,
    bookDate: new Date(),
    arrDate: new Date(),
    depDate: new Date(),
    numRoom: 0,
    numAdult: 0,
    numChildren: 0,
    prices: [],
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
        prices: [],
        user,
        rooms: []
    },
    recentBook: [],
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
        setBookingList(state, action) {
            state.bookingList = action.payload
        },
        setRecentBook(state, action) {
            state.recentBook = []
            action.payload.map((user: User) => {
                user.book.map((book: Booking) => {
                    let bookingTotal = 0
                    const prices = book.prices
                    prices.map(price => {
                        bookingTotal += price.price
                    })
                    state.recentBook.push({
                        id: book.bookingID,
                        name: user.firstName + " " + user.lastName,
                        email: user.auth.email,
                        total: bookingTotal
                    })
                })

            })
        },
        setUserBooking(state, action) {
            state.recentBook.map((recent) => {
                action.payload.map((user: User) => {
                    const books = user.book;
                    books.map((book) => {
                        console.log(recent.id + ' : ' + book.bookingID)
                        if (recent.id == book.bookingID) {
                            recent.name = user.firstName + ' ' + user.lastName
                            recent.email = user.auth.email
                        }
                    })
                })
            })
        },
        setNewDate(state, action) {
            const startDate = action.payload[0]
            const endDate = action.payload[1]
            if (startDate && endDate) {
                state.booking.arrDate = new Date(startDate)
                state.booking.depDate = new Date(endDate)
            } else if (startDate) {
                state.booking.arrDate = new Date(endDate)
            }
        },
        reSetBooking(state) {
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
            const price = {
                id: 0,
                roomID: action.payload,
                price: 0
            }

            state.booking.prices.push(price)
        }

    },
})

export const bookingAction = bookingSlice.actions;
export default bookingSlice