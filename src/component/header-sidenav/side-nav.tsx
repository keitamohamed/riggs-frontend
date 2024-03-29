import {AiOutlineClose} from "react-icons/ai";
import {useNavigate} from "react-router-dom";

import {useContext} from "react";
import {AuthContext, DashboardContext} from "../../setup/context/context.ts";
import {useUser} from "../../custom-hook/useUser.ts";

import logo from "../../assets/svg/riggs-logo-navy.svg"


export const SideNav = () => {
    const authCtx = useContext(AuthContext)
    const dashCtx = useContext(DashboardContext)
    const nav = useNavigate()
    const {findUserByEmail} = useUser()

    const setUserProfileInfo = async () => {
        await findUserByEmail(authCtx.getCookie().email)
        nav("/profile")
    }
    
    const sidebarHide = () => {
        const el = document.querySelector(".side-nav")
        const index = document.querySelector(".index") as HTMLElement
        if (el && index) {
            index.style.display = 'block'
            el.classList.remove('slide-in')
            el.classList.add('slide-out')
        }
    }

    const onClickScrollEvent = (className: string) => {
        sidebarHide()
        const element = document.querySelector(`.${className}`) as HTMLElement
        const position = element?.getBoundingClientRect().top + window.scrollY
        window.scrollTo({top: position - 250, behavior: 'smooth'})
    }

    return (
        <div className={`side-nav slide-out`}>
            <div className="off-canvas">
                <div className="canvas grid grid-cols-12 sm:grid-cols-1">
                    <div className={`nav-container col-start-1 col-end-8 sm:col-start-1 col-end-1`}>
                        <div className="canvas_inner grid-x">
                            <div className={`context grid grid-cols-12`}>
                                <div className="svg-container col-start-1 col-end-3">
                                    <li onClick={sidebarHide}>
                                        <AiOutlineClose />
                                    </li>
                                </div>
                                <div className={`context-canvas col-start-3 col-end-12 text-transform sm:pl-[3em]`}>
                                    <img src={logo} alt="logo"/>
                                </div>
                            </div>
                        </div>
                        <ul>
                            <nav className="links pl-[7em] sm:pl-[2em]">
                                {
                                    authCtx.isAuthenticated() ? <li onClick={setUserProfileInfo}>Account</li> : ''
                                }
                                {
                                    authCtx.isAuthenticated() &&
                                    authCtx.getCookie().Role == "ROLE_ADMIN" ?
                                        <li onClick={() => {nav('/dash'), dashCtx.setDisplayComponentType('dashboard-one')}}>Dashboard</li> : ''
                                }
                                {
                                    authCtx.isAuthenticated() && authCtx.isAdmin() ? (
                                        <li className='side-nav-link' onClick={() => nav('/register')}>
                                            Register
                                        </li>
                                    )
                                        : !authCtx.isAuthenticated() ? (
                                            <li className='side-nav-link' onClick={() => nav('/register')}>
                                                Register
                                            </li>
                                        ) : <></>
                                }

                                <li>About</li>
                                <li>Rooms & Suites</li>
                                <li>Experiences</li>
                            </nav>
                        </ul>
                        <ul className={`canvas-l-ul grid pl-[7em] sm:pl-[2em]`}>
                            <nav className={`nav grid grid-cols-2 gap-2 w-[100%] sm:grid-cols-1`}>
                                <li className='side-nav-link' onClick={() => onClickScrollEvent('email-container')}>Contact</li>
                                <li className='side-nav-link'>Gallery</li>
                                <li className='side-nav-link'>Press room</li>
                                <li className='side-nav-link'>Careers</li>
                                <li className='side-nav-link'>Our Hotels</li>
                                <li className='side-nav-link'>Terms & Conditions</li>
                            </nav>
                        </ul>
                    </div>
                    <div className="off-canvas_sidebar col-start-8 col-end-13">
                    </div>
                </div>
            </div>

        </div>
    )
}