import {createSlice} from "@reduxjs/toolkit";
import {FormInit} from "../../type-dt/type-dt.ts";

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
    },
    book: []
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
        },
        book: []
    },
    imgFile: {
        file: [],
        url: []
    },
    message: {
        id: 0,
        message: '',
        status: '',
        statusCode: 0
    },
    error: {
        errorCode: 0,
        errors: {},
        message: ''
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
            state.userForm.auth[auth.name as keyof object] = auth.value
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
            state.userForm.auth.role = action.payload
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
        addFile(state, action) {
           state.imgFile.file.push(action.payload as File)
        },
        addUrl(state, action) {
            state.imgFile.url.push(action.payload)
        },
        reSetFile(state) {
            state.imgFile = {
                file: [],
                url: []
            }
        },
        setMessage(state, action) {
            state.message = action.payload
        },
        setError(state, action) {
            state.error = {
                errorCode: action.payload.statusCode,
                errors: action.payload.map.error,
                message: action.payload.message
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
                message: ''
            }
        },
        reSetMessage(state) {
            state.message = {
                id: 0,
                message: '',
                status: '',
                statusCode: 0
            }
        }
    }

})

export const formAction = formSlice.actions
export default formSlice