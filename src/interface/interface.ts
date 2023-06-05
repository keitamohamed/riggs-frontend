
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
    userList: any[]

}