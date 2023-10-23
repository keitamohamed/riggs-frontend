import {useNavigate} from "react-router-dom";
import {CiMenuFries} from 'react-icons/ci'
import {useContext} from "react";
import {AuthContext} from "../../setup/context/context.ts";
import {useAppDispatch} from "../../setup/redux/reduxHook.ts";
import {authAction} from "../../setup/redux/authenticate.ts";

export const Header = () => {
    const nav = useNavigate()
    const authCtx = useContext(AuthContext)
    const dispatch = useAppDispatch()

    const toLogin = () => {
        nav("/login")
    }
    const setLogout = () => {
        authCtx.logout()
        dispatch(authAction.setLogout())
        nav('/')
    }

    const showSidebar = () => {
        const el = document.querySelector(".side-nav")
        const index = document.querySelector(".index") as HTMLElement
        if (el && index) {
            index.style.display = 'none'
            el.classList.remove('slide-out')
            el.classList.add('slide-in')
        }

    }

    return (
        <div className='header riggs-header header-transparent'>
            <div className="context-container grid grid-cols-10">
                <div className="nav col-span-1">
                    <li onClick={showSidebar}><CiMenuFries/></li>
                </div>
                <div className="title-container md:ml-28 lg:ml-28 xl:ml-28 col-start-2 col-end-8 sm:col-end-9">
                    <p>8080 F st nw</p>
                    <h1>Riggs</h1>
                    <p>Washington d.c</p>
                </div>
                <div className="action-btn grid grid-cols-2 sm:grid-cols-1 sm:col-span-2 col-span-3">
                    <div className={`book sm:hidden ${authCtx.isAuthenticated() ? '' : 'hidden'}`}
                         aria-disabled={true}
                    >
                        <h3 onClick={() => nav('/booking')}>Book Room</h3></div>
                    <div className="book login-signup">
                        <h5 className={`${authCtx.isAuthenticated() ? 'hidden' : 'block'}`} onClick={toLogin}>Login</h5>
                        <h5 className={`${authCtx.isAuthenticated() ? 'block' : 'hidden'}`} onClick={setLogout}>Logout</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}