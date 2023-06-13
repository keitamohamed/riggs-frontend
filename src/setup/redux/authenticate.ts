import {Credentials} from "../../interface/interface.ts";
import {createSlice} from "@reduxjs/toolkit";

const credentials: Credentials = {
    accessToken: "",
    refreshToken: "",
    email: "",
    role: "",
    error: {},
    code: ""
}

const initialState = {
    credentials,
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        setCookie(state, action) {
            const {refreshToken, expirationDate} = action.payload
            document.cookie = `token=${refreshToken}; Secure; Expires/Max-Age: ${expirationDate}; Expires = ${expirationDate}`
        },
        setCredentials(state, action) {
            const {accessToken, role, email} = action.payload
            state.credentials.accessToken = accessToken
            state.credentials.email = email
            state.credentials.role = role
        },
        reSetCredentials(state) {
            state.credentials = credentials
        },
        setError(state, action) {
            state.error = action.payload.error
        },
        setLogout(state) {
            state.credentials = credentials
        }
    }
})

export const authAction = authSlice.actions
export default authSlice