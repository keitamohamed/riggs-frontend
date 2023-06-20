import {ReactNode} from "react";

export interface Credentials  {
    accessToken: string,
    refreshToken: string;
    email: string,
    role: string,
    error: any;
    code: string
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

interface User {
    user: {
        userID: number
        firstName: string,
        lastName: string,
        phoneNum: string,
        address: UserAddress
        auth: UserAuth
    },
}

export interface UserInit {
    user: User
    userList: never[],
    booking: any[]
    message: any,
    error: User
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

export interface UIHideShowContextProvider {
    getShowAuth: () => boolean,
    setShowAuth: (value: boolean) => void
}

export interface Props {
    children?: ReactNode
}