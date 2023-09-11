
import {createSlice} from "@reduxjs/toolkit";

import {InitAppSys} from "../../interface/interface.ts";


const initialState: InitAppSys = {
    database: {components: undefined, status: ""},
    error: undefined,
    message: undefined
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setDatabaseHealth(state, action) {
            state.database = action.payload
        },
        setMessage(state, action) {
            state.message = action.payload
        },
        setError(state, action) {
            state.error = action.payload.error
        }
    }
})

export const appAction = appSlice.actions;
export default appSlice
