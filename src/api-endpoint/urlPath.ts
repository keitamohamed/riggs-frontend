export const APIPath =  {
    LOGIN: ('/login'),
    REGISTER: ('user/register'),
    LOAD_USERS: ('user/list'),
    FIND_USER_BY_ID: (userID: number) => `user/find-by-id/${userID}`,
    FIND_USER_BY_EMAIL: (email: string) => `user/find-by-email/${email}`,
    ADD_NEW_USER: ('user/add'),

    // User api
    UPDATE_USER_INFO: (id: number) => `user/update/${id}`,
    UPDATE_USER_AUTH: (id: number) => `user/update-auth/${id}`,

    // Room
    ROOM_LIST: ("room/list"),
    ADD_ROOM: ("room/add"),


    // Booking
    NEW_BOOKING: (userID: number) => `booking/add/${userID}`,
    DELETE_BOOKING: (id: number) => `booking/delete-booking/${id}`,


    // Admin access point
    APP_HEALTH: ("health")
}