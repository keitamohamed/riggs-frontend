export const APIPath =  {
    LOGIN: ('/login'),
    REGISTER: ('/user/register'),
    LOAD_USERS: ('user/list'),
    FIND_USER_BY_ID: (userID: number) => `808/riggs/user/find-by-id/${userID}`
}