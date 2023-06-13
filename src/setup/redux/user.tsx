import {createSlice} from "@reduxjs/toolkit";
import {UserInit} from "../../interface/interface.ts";


const initialState: UserInit = {
    user: {
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
    },
    booking: [],
    userList: [],
    message: {},
    error: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        user(state, action){
            const user = action.payload
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            state.user[user.name as keyof object] = user.value
        },
        setBooking(state, action) {
            const {book} = action.payload
            state.booking = book
        },
        setUser(state, action) {
            state.user = action.payload
        },
        userList(state, action) {
            state.userList = action.payload
        },
        setMessage(state, action) {
            state.message = action.payload
        },
        setError(state, action) {
            state.error = action.payload.error;
        },
    }

})

export const userAction = userSlice.actions
export default userSlice