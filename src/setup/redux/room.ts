import {createSlice} from "@reduxjs/toolkit";
import {InitRoom} from "../../interface-type/interface-type.ts";

const initialState: InitRoom = {
    room: {
        roomID: 0,
        roomName: '',
        description: '',
        size: '',
        price: 0,
        detail: {
            view: '',
            bed: '',
            animal: '',
            smoking: '',
            bathroom: '',
            tv: '',
            numberOfBed: 0
        }
    },
    rooms: [],
    message: {
        id: 0,
        message: '',
        status: '',
        statusCode: 0
    },
    error: {
        map: {}
    }
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
        setRoomDetail(state, action) {
            const room = action.payload
            if (room.value !== 'invalid-value') {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                state.room.detail[room.name as keyof object] = room.value
            }
        },
        setRoomName(state, action) {
            const room = action.payload
            if (room.value !== 'roomName') {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                state.room[room.name as keyof object] = room.value
            }
        },
        setRoom(state, action) {
            state.room = action.payload
        },
        resetRoom(state) {
            state.room = {
                roomID: 0,
                roomName: '',
                description: '',
                size: '',
                price: 0,
                detail: {
                    view: '',
                    bed: '',
                    animal: '',
                    smoking: '',
                    bathroom: '',
                    tv: '',
                    numberOfBed: 0
                }
            }
        },
        setRooms(state, action) {
            state.rooms = action.payload
        },
        setMessage(state, action) {
            state.message = action.payload
        },
        setError(state, action) {
            state.error.map = action.payload.map
        },
        reSetMessage(state) {
            state.message = {
                id: 0,
                message: '',
                status: '',
                statusCode: 0
            }
        },
        reSetError(state)  {
            state.error = {
                map: {}
            }
        }
    }
})

export const roomAction = roomSlice.actions;
export default roomSlice
