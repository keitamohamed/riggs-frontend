import {useCookies} from "react-cookie";
import {Credentials, Props} from "../../interface/interface.ts";
import {AuthContext} from "./context.ts";
import {useAppSelector} from "../redux/reduxHook.ts";

const {Provider} = AuthContext
const AuthProvider = ({children}: Props) => {
    const [cookie, setCookie, removeCookie] = useCookies(
        [
            'aToken',
            'refreshToken',
            'email',
            'Role',
        ]
    )

    const getCookie = (): any => {
        return cookie
    }

    const setCredentials = (credentials: Credentials) => {
        console.log(credentials)
        setCookie('aToken', credentials.accessToken)
        setCookie('refreshToken', credentials.refreshToken)
        setCookie('email', credentials.email)
        setRole(credentials)
        console.log('Email', credentials.email)
    }

    const setRole = (credentials: Credentials) => {
        const role = Object.keys(credentials).filter(key => key.includes("ROLE_"))
        setCookie('Role', role[0])
    }
    
    const isAuthenticated = () => {
      return !!(cookie.aToken && cookie.Role);
    }

    const isAdmin = () => {
        return cookie.Role === 'ROLE_ADMIN';
    }
    
    const logout = () => {
        const removeCredential = ['aToken', 'refreshToken', 'email', 'Role']
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