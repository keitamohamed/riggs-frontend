import {createSlice} from "@reduxjs/toolkit";
import {FormInit} from "../../interface/interface-type.ts";

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

const initialState: FormInit = {
    userForm: {
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
    message: '',
    error: {
        errorCode: 0,
        errors: {}
    }
}

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        user(state, action){
            const user = action.payload
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            state.userForm[user.name as keyof object] = user.value
        },
        setUpdate(state, action) {
            const user = action.payload
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            state.userForm[user.name as keyof object] = user.value
        },
        setSelectedUserToBeUpdate(state, action) {
            state.userForm = action.payload
        },
        setUpdateAddress(state, action) {
            const user = action.payload
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            state.userForm.address[user.name as keyof object] = user.value
        },
        setUpdateAuth(state, action) {
            const auth = action.payload
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            state.update.auth[auth.name as keyof object] = auth.value
        },
        setUser(state, action) {
            state.userForm = action.payload
        },
        setNewUserInput(state, action) {
            const user = action.payload
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            state.userForm[user.name as keyof object] = user.value
        },
        setRole(state, action) {
            const auth = action.payload
            state.userForm.auth['role'] = auth.value
        },
        setNewUserAddress(state, action) {
            const address = action.payload
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            state.userForm.address[address.name as keyof object] = address.value
        },
        setUserAuth(state, action) {
            const auth = action.payload
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            state.userForm.auth[auth.name as keyof object] = auth.value
        },
        setMessage(state, action) {
            state.message = action.payload
        },
        setError(state, action) {
            state.error = {
                errorCode: action.payload.statusCode,
                errors: action.payload.map.error,
            }
            // state.error = action.payload.error;
        },
        reSetForm(state) {
            state.userForm = resetForm
        },
        reSetError(state) {
            state.error = {
                errors: {},
                errorCode: 0,
            }
        },
        reSetMessage(state) {
            state.message = ""
        }
    }

})

export const formAction = formSlice.actions
export default formSlice