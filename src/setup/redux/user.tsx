import {createSlice} from "@reduxjs/toolkit";
import {User, UserInit} from "../../interface/interface.ts";

const resetForm = {
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
    update: {
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
const user: User = {
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
        setUpdate(state, action) {
            const user = action.payload
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            state.update[user.name as keyof object] = user.value
        },
        setSelectedUserToBeUpdate(state, action) {
            state.update = action.payload
        },
        setUpdateAddress(state, action) {
            const user = action.payload
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            state.update.address[user.name as keyof object] = user.value
        },
        setUpdateAuth(state, action) {
            const auth = action.payload
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            state.update.auth[auth.name as keyof object] = auth.value
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
        reSetForm(state) {
            state.update = resetForm
        },
        reSetError(state) {
            state.error = user
        },
        reSetMessage(state) {
            state.message = {}
        }
    }

})

export const userAction = userSlice.actions
export default userSlice