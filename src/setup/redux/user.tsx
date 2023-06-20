import {createSlice} from "@reduxjs/toolkit";
import {UserInit} from "../../interface/interface.ts";
import {User} from "../../component/page/user.tsx";


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
    error: {
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
        setNewUserInput(state, action) {
            const user = action.payload
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            state.user[user.name as keyof object] = user.value
        },
        setNewUserAddress(state, action) {
            const address = action.payload
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            state.user.address[address.name as keyof object] = address.value
        },
        setUserAuth(state, action) {
            const auth = action.payload
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            state.user.auth[auth.name as keyof object] = auth.value
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
        reSetError(state) {
            state.error = {}
        }
    }

})

export const userAction = userSlice.actions
export default userSlice