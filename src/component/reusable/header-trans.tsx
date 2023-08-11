import {useContext, useEffect} from "react";
import {AuthContext, UIActionContext} from "../../setup/context/context.ts";
import {useNavigate} from "react-router-dom";
import {AiOutlineClose} from "react-icons/ai";
import {BiHotel} from "react-icons/bi";

import {authAction} from "../../setup/redux/authenticate.ts";
import {useAppDispatch, useAppSelector} from "../../setup/redux/reduxHook.ts";
import logo from "../../assets/img/riggs-logo-navy.svg";
import {useBooking} from "../../custom-hook/useBooking.ts";
import {useUser} from "../../custom-hook/useUser.ts";

type props = {custom_class: string}
export const TransparentHeader = ({custom_class}: props) => {
    const nav = useNavigate()
    const authCtx = useContext(AuthContext)
    const uiCtx = useContext(UIActionContext)
    const dispatch = useAppDispatch()
    const {bookRoom} = useBooking()
    const {findUserByID} = useUser()
    const {booking: {rooms}} = useAppSelector((state) => state.booking)
    const {user} = useAppSelector((state) => state.user)


    const setLogout = () => {
        authCtx.logout()
        dispatch(authAction.setLogout())
        nav('/')
    }
    
    const onClickSendReservation = () => {
        bookRoom()
        findUserByID(user.userID)
    }

    const numRooms = () => {
      return rooms.length
    }

    return (
        <div className={`header ${custom_class}`}>
            <div className={`title-container grid gap-2 grid-cols-12`}>
                {
                    numRooms() > 0 ? <li
                        className={'reserve-btn grid place-content-start col-start-1 col-end-3 w-full list-none cursor-pointer'}
                        onClick={onClickSendReservation}
                    >
                        <span className='sm:!top-[-.6em]'>{numRooms()}</span>
                        <BiHotel className='hidden sm:block'/>
                        <li className='sm:hidden'>Reserve</li>
                    </li> : <></>
                }
                <div className={`context w-full ${numRooms() > 0 ? 'col-start-4 col-end-11 text-transform' : 'col-start-1 col-end-10 place-content-center'}`}>
                    <div className={`context-canvas w-full`}>
                        <li className={`list-none w-full grid place-content-center  ${numRooms() == 0 ? 'sm:place-content-end sm:pr-6' : ''}`} onClick={() => nav('/')}>
                            <img className={`${numRooms() == 0 ? 'ml-[10em] sm:ml-[6em]' : 'mr-[10em] sm:mr-[4em]'} sm:mr-[1em] sm:pr-4`} src={logo} alt="logo"/>
                        </li>
                    </div>
                </div>
                {
                    uiCtx.getShowRooms() ? (
                        <div className={`grid place-content-end action-container w-full ${numRooms() > 0 ? 'col-start-11 col-end-13' : 'col-start-10 col-end-13'}`}>
                            <AiOutlineClose onClick={() => uiCtx.setShowRooms(false)}/>
                        </div>
                    ) : <div className={`${numRooms() > 0 ? 'col-start-11 col-end-13' : 'col-start-10 col-end-13'}`}>
                        <div className="book login-signup grid place-content-end">
                            <h5 className={``} onClick={setLogout}>Logout</h5>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}