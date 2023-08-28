import {AiFillEdit} from "react-icons/ai";
import {LuEdit2} from "react-icons/lu";

import {TransparentHeader} from "../header-sidenav/header-trans.tsx";
import img from "../../assets/img/profile-img.jpg"
import {useUser} from "../../custom-hook/useUser.ts";
import {useAppDispatch, useAppSelector} from "../../setup/redux/reduxHook.ts";
import {useCallback, useContext, useEffect, useState} from "react";
import {SwiperImage} from "../swiper/swiper-image.tsx";
import {AuthContext} from "../../setup/context/context.ts";
import {Model} from "../model/Model.tsx";

import {Alert} from "../reusable/alert.tsx";
import {formAction} from "../../setup/redux/form.ts";
import {bookingAction} from "../../setup/redux/booking.ts";

export const Profile = () => {
    const authCtx = useContext(AuthContext)
    const dispatch = useAppDispatch()
    const {user, booking} = useAppSelector((state) => state.user)
    const {message, error} = useAppSelector((state) => state.booking)
    const {findUserByEmail} = useUser()
    const [loadUserDate, setLoadUserData] = useState<boolean>(false)
    
    const userTotalBooking = () => {
      return booking.length
    }

    const onClickShowModel = () => {
        const el = document.querySelector('.model') as HTMLElement
        if (el) {
            el.classList.remove('model-close')
            el.classList.add('model-open')
            dispatch(formAction.setSelectedUserToBeUpdate(user))
            dispatch(formAction.reSetMessage())
        }
    }

    const listenScrollEvent = () => {
        const header = document.querySelector('.header')
        if (window.scrollY > 200 && header != null) {
            header.classList.add('transparent')
        } else if (window.scrollY < 100 && header != null) {
            header.classList.remove('transparent')
        }
    }

    const fetchUserDate = useCallback(() => {
        if (!user.userID) {
            return findUserByEmail(authCtx.getCookie().email)
        }
    }, [authCtx, findUserByEmail])

    const reSetMessageNError = () => {
        dispatch(formAction.reSetMessage())
        dispatch(formAction.reSetError())
    }

    useEffect( () => {
        if (!loadUserDate) {
            fetchUserDate()
            setLoadUserData(true)
        }
        window.addEventListener('scroll', listenScrollEvent)
        return () => window.addEventListener('scroll', listenScrollEvent)
    }, [booking, message, error])

    return (
        <>
            <Model show={'user-update'} />
            <div className="profile_profile">
                <TransparentHeader custom_class={'transparent-bg'}/>
                <div className="main sm:p-0">
                    <div className="content">
                        <div className="user_info flex items-center
                        space-x-6 sm:grid sm:grid-cols-1 border-1 sm:border-0">
                            <img src={img} alt="avatar" className="w-24 h-24 rounded sm:w-full sm:h-full"/>
                            <div className="info-container infocol-span-6
                            flex items-center space-x-4 w-full sm:mb-5">
                                <div className="info grow sm:p-2">
                                    {
                                        user.firstName ? (
                                            <>
                                                <h2>{`${user.firstName + " " + user.lastName}`}</h2>
                                                <div className="user-detail">
                                                    <p>{user.auth.email}</p>
                                                    <p>{user.address.street + '\n' +
                                                        user.address.city + ", " + user.address.state +
                                                        " " + user.address.zipcode}</p>
                                                </div>
                                            </>
                                        ) : <p>Loading data....</p>
                                    }
                                </div>
                                <div className="action_btn flex-none w-fit
                                grid grid-cols-2 justify-center
                                sm:rounded-full sm:grid-cols-1 bg-[#EEEEEE]
                                p-2
                                top-0 right-2
                                sm:-top-5
                                sm:bg-[#ED2B2A] sm:p-4">
                                    <li className='list-none'
                                        onClick={onClickShowModel}>
                                        <LuEdit2 className="text-1xl hidden sm:block sm:text-white text-[#19A7CE]"/>
                                    </li>
                                    <li
                                        className='list-none'
                                        onClick={onClickShowModel}>
                                        <AiFillEdit className="text-1xl block sm:hidden sm:text-white text-[#19A7CE]"/>
                                    </li>
                                    <p className="sm:hidden text-[#19A7CE]">Edit</p>
                                </div>
                            </div>
                        </div>
                        <div className="booking-detail grid grid-cols-2 mt-1 w-full sm:grid-cols-1">
                            <div className="room-book ">
                                <div className="num-room">
                                    <h1>{userTotalBooking()}</h1>
                                    <p>Booking i've made</p>
                                </div>
                            </div>
                            <div className="room-book">
                                <div className="num-room">
                                    <h1>$189</h1>
                                    <p>Average cost for each room</p>
                                </div>
                            </div>
                        </div>
                        <SwiperImage/>
                        {
                            (message || error) && Object.keys(message).length > 0 || Object.keys(error).length > 0  ?
                                <Alert
                                    function={reSetMessageNError}
                                    message={message.message}
                                    error={`${error && error.status === 'UNPROCESSABLE_ENTITY'  ? 'Unprocessable Entity. Check all field' : ''}`}
                                /> : <></>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}