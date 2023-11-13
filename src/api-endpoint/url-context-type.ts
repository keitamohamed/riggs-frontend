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
    USER_EXCEL_FILE: (`user/user-excel-file`),

    // Room
    ROOM_LIST: ("room/list"),
    ADD_ROOM: ("room/add"),
    UPDATE_ROOM: (id: number) => `room/update/${id}`,
    DELETE_ROOM: (roomID: number) => `room/delete/${roomID}`,

    // Booking
    NEW_BOOKING: (userID: number) => `booking/add/${userID}`,
    BOOKING_LIST: (`booking/list-of-booking`),
    DELETE_BOOKING: (id: number) => `booking/delete-booking/${id}`,


    // Admin access point
    APP_HEALTH: ("health"),
    APP_HTTPEXCHANGES: ("httpexchanges"),


    //File Upload
    FILE_BASE_DIR: ('http://localhost:8080/riggs/'),

    USER_FILE: (userID: number) => `user/file-upload/${userID}`,
    ROOM_IMAGE_SAVE: (roomID: number) => `room/save-image/${roomID}`,
    ROOM_IMAGE_DOWNLOAD: (id: number) => `room/download-image/${id}`,

}

export const ContextType = {
    JSONFILE: ('application/json'),
    FILE: ('multipart/form-data')
}