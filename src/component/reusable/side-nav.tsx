import {AiOutlineClose} from "react-icons/ai";
import {useNavigate} from "react-router-dom";

import logo from '../../assets/img/riggs-logo-navy.svg'
import {useContext} from "react";
import {AuthContext} from "../../setup/context/context.ts";

export const SideNav = () => {
    const authCtx = useContext(AuthContext)
    const nav = useNavigate()
    
    const sidebarHide = () => {
        const el = document.querySelector(".side-nav")
        const index = document.querySelector(".index") as HTMLElement
        if (el && index) {
            index.style.display = 'block'
            el.classList.remove('slide-in')
            el.classList.add('slide-out')
        }
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
                                    authCtx.isAuthenticated() ? <li onClick={() => nav("/profile")}>Account</li> : ''
                                }
                                <li>About</li>
                                <li>Rooms & Suites</li>
                                <li>Experiences</li>
                            </nav>
                        </ul>
                        <ul className={`canvas-l-ul grid pl-[7em] sm:pl-[2em]`}>
                            <nav className={`nav grid grid-cols-2 gap-2 w-[90%] sm:grid-cols-1`}>
                                <li>Contact</li>
                                <li>Gallery</li>
                                <li>Press room</li>
                                <li>Careers</li>
                                <li>Our Hotels</li>
                                <li>Terms & Conditions</li>
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