import {
    AiFillHome,
    AiOutlineClose,
    AiOutlineDown, AiOutlineForm,
    AiOutlineLeft,
    AiOutlineTable,
    AiOutlineUsergroupAdd
} from "react-icons/ai";
import {FaHotel} from "react-icons/fa";
import {IoIosBed} from "react-icons/io";
import React, {useContext} from "react";
import {useAppDispatch, useAppSelector} from "../../setup/redux/reduxHook.ts";
import {DashboardContext} from "../../setup/context/context.ts";
import {roomAction} from "../../setup/redux/room.ts";
import {formAction} from "../../setup/redux/form.ts";
import {useNavigate} from "react-router-dom";

import logo from "../../assets/svg/riggs-logo-white.svg";

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

    const updatedAction = () => {
        const ele: HTMLElement = document.querySelector('.update-btn-container') as HTMLElement;
        const actionBtn: HTMLElement = document.querySelector('.updated-btn') as HTMLElement;
        ele.classList.toggle("h-full")
        actionBtn.classList.toggle('arrow-down')
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
                <div className={`context sms:grid sms:grid-cols-2`}>
                    <div className={`context-canvas mt-[1em] mb-[.5em] grid place-content-center justify-start`}>
                        <li className={`list-none grid place-content-center justify-start`} onClick={() => nav('/')}>
                            <img className={`logo w-[50%]`} src={logo} alt="logo"/>
                        </li>
                    </div>
                    <div className="close-btn-container hidden place-content-center justify-end sms:grid">
                        <li className={'hidden sms:block'} onClick={sidebarHide}><AiOutlineClose className='grid ml-auto'/></li>
                    </div>
                </div>
                <div className="avatar flex gap-3 place-content-center justify-center">
                    <div className="image-container">
                        <img className="w-12 h-12 rounded-full" src={'/profile-img.jpg'} alt="img"/>
                    </div>
                    <div className="avatar-name-container grid place-content-center">
                        <h2>{user.firstName + ' ' + user.lastName}</h2>
                    </div>
                </div>
                <div className="dash-btn-container">
                    <li className='smg:!hidden' onClick={
                        () => onClick('dashboard-one')}>
                        <span>Main</span><AiFillHome/>
                    </li>
                    <li className='!hidden smg:!flex' onClick={
                        () => {onClick('dashboard-one'); sidebarHide()}}>
                        <span>Main</span><AiFillHome/>
                    </li>

                    <li className='smg:!hidden' onClick={() => {onClick('dashboard-two')}}>
                        <span>Room</span> <FaHotel/>
                    </li>
                    <li className='!hidden smg:!flex'
                        onClick={() => {onClick('dashboard-two'); sidebarHide()}}>
                        <span>Room</span> <FaHotel/>
                    </li>
                </div>
                <div className="dash-buttons-container">
                    <li className='' onClick={() => {
                        dashCtx.setDisplayComponentType('user-form')}}>
                        <AiOutlineUsergroupAdd/><span>User Form</span></li>
                    <li className=''
                        onClick={() => {
                            onClick('add-room')
                        }}
                    ><IoIosBed/><span>Room Form</span></li>
                    <li><AiOutlineTable/> <span>Tables</span></li>
                </div>
                <div className="dash-buttons-container-update">
                            <span className='updated-btn'
                                  onClick={updatedAction}
                            >
                                Updated
                                <AiOutlineLeft/>
                                <AiOutlineDown/>
                            </span>
                    <div className="update-btn-container">
                        <li className=''><AiOutlineForm/><span>Updated User</span></li>
                        <li className=''><AiOutlineForm/><span>Updated Room</span></li>
                        <li><AiOutlineTable/> <span>Tables</span></li>
                    </div>
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