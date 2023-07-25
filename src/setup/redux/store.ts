import {configureStore, combineReducers, AnyAction} from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import authSlice from "./authenticate.ts";
import userSlice from "./user.tsx";
import roomSlice from "./room.ts";
import bookingSlice from "./booking.ts";



const reducers = combineReducers({
    auth: authSlice.reducer,
    user: userSlice.reducer,
    room: roomSlice.reducer,
    booking: bookingSlice.reducer
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
