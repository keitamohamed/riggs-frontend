import {ReactNode} from "react";

export interface Credentials  {
    accessToken: string,
    refreshToken: string;
    email: string,
    role: string,
    error: unknown
    code: string
}

export interface CredentialsReset {
    accessToken: string,
    email: string,
    role: string,
}

export interface AuthContextProperty {
    getCookie: () => any,
    setCredentials: (useCredential: Credentials) => void,
    setExpiredToken: (useCredential: CredentialsReset) => void,
    isAuthenticated: () => boolean,
    isAdmin: () => boolean,
    logout: () => void,
}

export interface DashboardContextProperty {
    getDisplayComponent: () => string,
    setDisplayComponentType: (toDisplay: string) => void,
    getFormType: () => string,
    setFormType: (toDisplay: string) => void,
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

export interface FormInit {
    userForm: User
    message: string,
    error: {
        errorCode: number,
        errors: any,
    }
}

export interface UserInit {
    user: User
    listUser: never[],
    booking: any[]
    message: any,
    error: any
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
    roomID: number,
    roomName: string,
    description: string,
    size: string,
    detail: {
        view: string,
        bed: string,
        animal: string,
        smoking: string,
        bathroom: string,
        tv: string,
        numberOfBed: number
    }
}


export interface Exchange {
    timestamp: string,
    request: {
        uri: string,
        method: string,
    },
    response: {
        status: number
    },
    timeTaken: string
}

export interface TrafficData {
    code: number,
    recurrent: number
}

export interface BookingData {
    month: string,
    book: number,
    amount: number,
}

export interface InitAppSys {
    database: {
        components: any
        status: string
    }
    traces: Exchange[]
    exchanges: Exchange[]
    chartData: TrafficData[]
    exchange200: number,
    exchange400: number,
    exchange404: number,
    exchange500: number,
    message: unknown,
    error: unknown
}

export interface InitRoom {
    room: Room,
    rooms: any[],
    message: unknown,
    error: {
        map: any
    }
}

export interface ShowRoomDetail {
    setShowDetail: (id: number, value: boolean) => void
    showDetail: () => number
}

export interface Props {
    children?: ReactNode
}