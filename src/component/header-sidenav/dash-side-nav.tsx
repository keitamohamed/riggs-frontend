import React, {useContext} from "react";
import { AiFillHome, AiOutlineClose,
    AiOutlineTable, AiOutlineUsergroupAdd
} from "react-icons/ai";
import {FaHotel} from "react-icons/fa";
import {IoIosBed} from "react-icons/io";
import {useAppDispatch, useAppSelector} from "../../setup/redux/reduxHook.ts";
import {DashboardContext} from "../../setup/context/context.ts";
import {roomAction} from "../../setup/redux/room.ts";
import {formAction} from "../../setup/redux/form.ts";
import {useNavigate} from "react-router-dom";

import logoWhite from "../../assets/svg/riggs-logo-white.svg";
import logoNavy from "../../assets/svg/riggs-logo-navy.svg";

export const DashSideNav = () => {
    const nav = useNavigate()
    const dashCtx = useContext(DashboardContext)
    const {user} = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()


    const onClick = (str: string) => {
        dispatch(roomAction.resetRoom())
        dispatch(roomAction.reSetError())
        dispatch(formAction.reSetError())
        dashCtx.setDisplayComponentType(str)
    }

    const sidebarHide = () => {
        const el = document.querySelector(".dash-sidebar")
        const dashboardContainer = document.querySelector(".dashboard-context-container") as HTMLElement
        if (el && dashboardContainer) {
            dashboardContainer.style.display = 'grid'
            el.classList.remove('slide-in')
            el.classList.add('slide-out')
        }
    }

    return (
        <div className="dash-sidebar lg:inline-block xl:inline-block col-start-1 col-end-3 sms:col-start-1 sms:col-end-13 sms:z-10 sm:hidden md:hidden">
            <div className="sidebar-context">
                <div className={`context cul:grid cul:grid-cols-2`}>
                    <div className={`context-canvas mt-[1em] mb-[.5em] grid place-content-center justify-start`}>
                        <li className={`list-none grid place-content-start justify-start`} onClick={() => nav('/')}>
                            <img className={`logo w-[50%] sm:hidden`} src={logoWhite} alt="logo"/>
                            <img className={`logo w-[50%] md:hidden lg:hidden xl:hidden`} src={logoNavy} alt="logo"/>
                        </li>
                    </div>
                    <div className="close-btn-container hidden place-content-center justify-end cul:grid">
                        <div className="avatar grid grid-cols-1 gap-3 place-content-start justify-center">
                            <div className="image-container">
                                <img className="w-3 h-3 rounded-full cursor-pointer"
                                     src={'/profile-img.jpg'}
                                     alt="img"
                                     onClick={() => nav("/profile")}
                                />
                            </div>
                            <div className="avatar-name-container grid place-content-center">
                                <h2 className='cursor-pointer'
                                    onClick={() => nav('/profile')}
                                >
                                    {user.firstName + ' ' + user.lastName}
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="avatar flex gap-3 place-content-center justify-center cul:hidden">
                    <div className="image-container">
                        <img
                            className="w-12 h-12 rounded-full cursor-pointer"
                            src={'/profile-img.jpg'} alt="img"
                            onClick={() => nav("/profile")}/>
                    </div>
                    <div className="avatar-name-container grid place-content-center">
                        <h2 className='cursor-pointer'
                            onClick={() => nav("/profile")}
                        >
                            {user.firstName + ' ' + user.lastName}
                        </h2>
                    </div>
                </div>
                <div className="dash-btn-container">
                    <li className='on-lg-hide' onClick={
                        () => onClick('dashboard-one')}>
                        <AiFillHome/>
                        <span>Main</span>
                    </li>
                    <li className='on-sm-show' onClick={
                        () => {onClick('dashboard-one'); sidebarHide()}}>
                        <span>Main Dash</span>
                    </li>

                    <li className='on-lg-hide' onClick={() => {onClick('dashboard-two')}}>
                        <FaHotel/>
                        <span>Room</span>
                    </li>
                    <li className='on-sm-show'
                        onClick={() => {onClick('dashboard-two'); sidebarHide()}}>
                        <span>Room Dash</span> <FaHotel/>
                    </li>
                </div>
                <div className="dash-buttons-container">
                    <li className='' onClick={() => {
                        dashCtx.setDisplayComponentType('user-form'); sidebarHide()}}>
                        <AiOutlineUsergroupAdd/><span>User Form</span></li>
                    <li className=''
                        onClick={() => {onClick('add-room'); sidebarHide()}}>
                        <IoIosBed/><span>Room Form</span></li>
                    <li><AiOutlineTable/> <span>Tables</span></li>
                </div>
            </div>
            <div className="sidebar-hidden-style-white hidden">
                <div className="close-btn-container place-content-center justify-end">
                    <li className={'hidden sms:block'} onClick={sidebarHide}><AiOutlineClose className='grid ml-auto'/></li>
                </div>
            </div>
        </div>
    )
}