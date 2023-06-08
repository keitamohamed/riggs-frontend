
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
        firstName: string,
        lastName: string,
        phoneNum: string,
        address: {
            street: string,
            city: string,
            state: string,
            zipcode: string
        },
        auth: {
            email: string,
            password: string,
            role: string
        }
    },
    userList: never[],
    message: any,
    error: any
}