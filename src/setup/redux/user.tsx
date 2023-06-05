import {createSlice} from "@reduxjs/toolkit";
import {UserInit} from "../../interface/interface.ts";


const initialState: UserInit = {
    user: {
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
    userList: []
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
        userList(state, action) {
            state.userList = action.payload
        }
    }

})

export const userAction = userSlice.actions
export default userSlice