
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

export interface UserInit {
    user: {
        userID: number
        firstName: string,
        lastName: string,
        phoneNum: string,
        address: UserAddress
        auth: UserAuth
    },
    userList: never[],
    booking: any[]
    message: any,
    error: any
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