import {AiOutlineClose} from "react-icons/ai";
import {useNavigate} from "react-router-dom";

import logo from '../../assets/img/riggs-logo-navy.svg'
import {useContext} from "react";
import {AuthContext} from "../../setup/context/context.ts";
import {useUser} from "../../custom-hook/useUser.ts";

export const SideNav = () => {
    const authCtx = useContext(AuthContext)
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

    const handleClick = (target: string) => {
        const clickElement = document.querySelector(`.side-nav-link`)
        clickElement?.addEventListener('click', () => {
            const element = document.querySelector(`.${target}`) as HTMLElement
            const position = element?.getBoundingClientRect().top + window.scrollY
            sidebarHide()
            window.scrollTo({top: position - 205, behavior: 'smooth'})
        })
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
                                <li>About</li>
                                <li>Rooms & Suites</li>
                                <li>Experiences</li>
                            </nav>
                        </ul>
                        <ul className={`canvas-l-ul grid pl-[7em] sm:pl-[2em]`}>
                            <nav className={`nav grid grid-cols-2 gap-2 w-[90%] sm:grid-cols-1`}>
                                <li className='side-nav-link' onClick={() => handleClick('new-letter')}>Contact</li>
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