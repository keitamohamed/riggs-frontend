import {ReactNode} from "react";

export interface Credentials  {
    accessToken: string,
    refreshToken: string;
    email: string,
    role: string,
    error: any;
    code: string
}

export interface AuthContextProperty {
    getCookie: () => any
    setCredentials: (useCredential: Credentials) => void,
    isAuthenticated: () => boolean,
    isAdmin: () => boolean,
    logout: () => void,
}

export interface UIHideShowContextProvider {
    getShowAuth: () => boolean,
    setShowAuth: (value: boolean) => void,
    setShowRooms: (value: boolean) => void,
    getShowRooms: () => boolean,
}

export type LoginCredential = {
    email?: string,
    password?: string;
}

export type LoginError = {
    email?: string;
    password?: string
    message?: string;
}

export interface User {
    userID: number
    firstName: string,
    lastName: string,
    phoneNum: string,
    address: UserAddress
    auth: UserAuth
}

export interface UserInit {
    user: User
    userList: never[],
    booking: any[]
    message: any,
    error: User
}


export interface BookingInit {
    booking: Booking,
    bookingList: Booking[]
    message: any,
    error: any
}

export interface Booking {
    bookingID: number
    bookDate: Date,
    arrDate: Date,
    depDate: Date,
    numRoom: number,
    numAdult: number,
    numChildren: number
    user: User,
    rooms: Room[]
}

export type booking = {
    bookingID: number
    bookDate: Date,
    arriDate: Date,
    depDate: Date,
    numRoom: number,
    numAdult: number,
    numChildren: number
    user: User,
    rooms: Room[]
}

interface UserAddress {
    street: string,
    city: string,
    state: string,
    zipcode: string
}

interface UserAuth {
    email: string,
    password: string,
    role: string
}

export interface Room {
    nameName: string,
    description: string,
    size: string,
    detail: {
        view: string,
        bed: string,
        animal: string,
        smoking: string,
        bathroom: string,
        tv: string,
        numOfBed: number
    }
}

export interface InitRoom {
    room: Room,
    rooms: any[],
    message: any,
    error: any
}

export interface ShowRoomDetail {
    setShowDetail: (id: number, value: boolean) => void
    getShowDetail: () => boolean
}

export interface Props {
    children?: ReactNode
}