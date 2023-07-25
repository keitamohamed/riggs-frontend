import {useCookies} from "react-cookie";
import {Credentials, Props} from "../../interface/interface.ts";
import {AuthContext} from "./context.ts";

const {Provider} = AuthContext
const AuthProvider = ({children}: Props) => {

    const [cookie, setCookie, removeCookie] = useCookies(
        [
            'token',
            'refreshToken',
            'Role',
            ''
        ]
    )

    const getCookie = (): any => {
        return cookie
    }

    const setCredentials = (credentials: Credentials) => {
        setCookie('token', credentials.accessToken)
        setCookie('refreshToken', credentials.refreshToken)
        setRole(credentials)
    }

    const setRole = (credentials: Credentials) => {
        const role = Object.keys(credentials).filter(key => key.includes("Role_"))
        setCookie('Role', role[0])
    }
    
    const isAuthenticated = () => {
        // console.log("Print this", cookie.accessToken, '\n', cookie.Role, !!(cookie.accessToken && cookie.Role))
      return !!(cookie.token && cookie.Role);
    }

    const isAdmin = () => {
        return cookie.Role === 'Role_ADMIN';
    }
    
    const logout = () => {
        const removeCredential = ['token', 'refreshToken', 'Role']
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        removeCredential.forEach(name => removeCookie(name))
    }

    return (
        <Provider value={{
            getCookie,
            setCredentials,
            isAuthenticated,
            isAdmin,
            logout
        }}>
            {
                children
            }
        </Provider>
    )
}

export default AuthProvider