import {createSlice} from "@reduxjs/toolkit";
import {UserInit} from "../../interface/interface-type.ts";


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
    listUser: [],
    message: {},
    error: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setBooking(state, action) {
            const {book} = action.payload
            state.booking = book
        },
        setUser(state, action) {
            state.user = action.payload
        },
        setRole(state, action) {
            const auth = action.payload
            state.user.auth['role'] = auth.value
        },
        userList(state, action) {
            state.listUser = action.payload
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