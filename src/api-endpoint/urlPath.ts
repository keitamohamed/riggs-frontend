export const APIPath =  {
    LOGIN: ('/login'),
    REGISTER: ('user/register'),
    LOAD_USERS: ('user/list'),
    FIND_USER_BY_ID: (userID: number) => `user/find-by-id/${userID}`,
    FIND_USER_BY_EMAIL: (email: string) => `user/find-by-email/${email}`,
    ADD_NEW_USER: ('user/add'),
    ROOM_LIST: ("room/list")
}