import {useCookies} from "react-cookie";
import {Credentials, CredentialsReset, Props} from "../../interface/interface.ts";
import {AuthContext} from "./context.ts";
import {useAppDispatch, useAppSelector} from "../redux/reduxHook.ts";
import {authAction} from "../redux/authenticate.ts";

const {Provider} = AuthContext
const AuthProvider = ({children}: Props) => {
    const dispatch = useAppDispatch()
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
        setCookie('aToken', credentials.accessToken)
        setCookie('refreshToken', credentials.refreshToken)
        setCookie('email', credentials.email)
        setRole(credentials)
    }

    const setRole = (credentials: Credentials) => {
        const role = Object.keys(credentials).filter(key => key.includes("ROLE_"))
        setCookie('Role', role[0])
    }
    
    const isAuthenticated = () => {
        return (cookie.aToken != undefined && cookie.Role != undefined);
    }

    const isAdmin = () => {
        return cookie.Role === 'ROLE_ADMIN';
    }

    const setExpiredToken = (credentials: CredentialsReset) => {
        setCookie('aToken', credentials.accessToken)
        setCookie('email', credentials.email)
        setCookie('Role', credentials.role)
        dispatch(authAction.setLogout())
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
            setExpiredToken,
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