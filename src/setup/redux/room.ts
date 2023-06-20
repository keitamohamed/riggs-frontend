import {createSlice} from "@reduxjs/toolkit";

import {InitRoom, Room} from "../../interface/interface.ts";


const initialState: InitRoom = {
    room: {
        nameName: '',
        description: '',
        size: '',
        detail: {
            view: '',
            bed: '',
            animal: '',
            smoking: '',
            bathroom: '',
            tv: '',
            numOfBed: 0
        }
    },
    rooms: [],
    message: {},
    error: {}
}

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        newRoom(state, action) {
            const room = action.payload
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            state.room[room.name as keyof object] = room.value
        },
        setRoom(state, action) {
            state.room = action.payload
        },
        setRooms(state, action) {
            state.rooms = action.payload
        },
        setMessage(state, action) {
            state.message = action.payload
        },
        setError(state, action) {
            state.error = action.payload.error
        }
    }
})

export const roomAction = roomSlice.actions;
export default roomSlice
