import {useContext} from "react";
import {AuthContext, UIActionContext} from "../../setup/context/context.ts";
import {useNavigate} from "react-router-dom";
import {AiOutlineClose} from "react-icons/ai";
import {BiHotel} from "react-icons/bi";

import {authAction} from "../../setup/redux/authenticate.ts";
import {useAppDispatch, useAppSelector} from "../../setup/redux/reduxHook.ts";
import logo from "../../assets/img/riggs-logo-navy.svg";

type props = {custClass: string}
export const TransparentHeader = ({custClass}: props) => {
    const nav = useNavigate()
    const authCtx = useContext(AuthContext)
    const uiCtx = useContext(UIActionContext)
    const dispatch = useAppDispatch()
    const {booking: {rooms}} = useAppSelector((state) => state.booking)


    const setLogout = () => {
        authCtx.logout()
        dispatch(authAction.setLogout())
        nav('/')
    }
    
    const onClickSendReservation = () => {
        console.log('Reser')
    }

    const numRooms = () => {
      return rooms.length
    }

    return (
        <div className={`header ${custClass}`}>
            <div className={`title-container grid gap-2 grid-cols-12`}>
                {
                    numRooms() > 0 ? <li
                        className={'reserve-btn grid place-content-start col-start-1 col-end-3 w-full list-none cursor-pointer'}
                        onClick={onClickSendReservation}
                    >
                        <span>{numRooms()}</span>
                        Reserve
                    </li> : <></>
                }
                <div className={`context w-full ${numRooms() > 0 ? 'col-start-4 col-end-11 text-transform' : 'col-start-1 col-end-10 place-content-center'}`}>
                    <div className={`context-canvas w-full`}>
                        <li className={`list-none w-full grid place-content-center ${numRooms() == 0 ? 'place-content-end pr-6' : ''}`} onClick={() => nav('/')}>
                            <img src={logo} alt="logo"/></li>
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