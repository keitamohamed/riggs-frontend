import {configureStore, combineReducers, AnyAction} from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import appSlice from "./app.ts";
import authSlice from "./authenticate.ts";
import userSlice from "./user.ts";
import roomSlice from "./room.ts";
import bookingSlice from "./booking.ts";
import formSlice from "./form.ts"

const reducers = combineReducers({
    app: appSlice.reducer,
    auth: authSlice.reducer,
    user: userSlice.reducer,
    room: roomSlice.reducer,
    booking: bookingSlice.reducer,
    form: formSlice.reducer
})


const rootReducer = (state: any, action: AnyAction) => {
    if (action.type === '/logout') {
        state = undefined
    }
    return reducers(state, action)
}

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
})

export type AppStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
