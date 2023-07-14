import {useNavigate} from "react-router-dom";
import {AiOutlineMenu} from "react-icons/ai";

export const Header = () => {
    const nav = useNavigate()
    const toLogin = () => {
        nav("/login")
    }

    return (
        <div className='header riggs-header'>
            <div className="context-container grid grid-cols-10">
                <div className="nav col-span-1">
                    <AiOutlineMenu/>
                </div>
                <div className="title-container md:ml-28 lg:ml-28 xl:ml-28 col-start-2 col-end-8 sm:col-end-9">
                    <p>8080 F st nw</p>
                    <h1>Riggs</h1>
                    <p>Washington d.c</p>
                </div>
                <div className="action-btn grid grid-cols-2 sm:grid-cols-1 sm:col-span-2 col-span-3">
                    <div className="book sm:hidden"><h3 onClick={() => nav('/booking')}>Book Room</h3></div>
                    <div className="book login-signup">
                        <h5 onClick={toLogin}>Login</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}