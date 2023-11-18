import React, {useCallback, useContext, useEffect, useState} from "react";

import {CiMenuBurger, CiHardDrive} from 'react-icons/ci'
import {BsHddNetwork, BsDatabase} from 'react-icons/bs'
import {BiTime} from 'react-icons/bi'

import {Room} from "../../type-dt/type-dt.ts";

import {DashboardRoom} from "../reusable/admin-dashboard-room.tsx";
import {useAppDispatch, useAppSelector} from "../../setup/redux/reduxHook.ts";
import {useApp} from "../../custom-hook/useApp.ts";
import {Dash} from "../reusable/dash.tsx";

import {useUser} from "../../custom-hook/useUser.ts";
import {AuthContext, DashboardContext} from "../../setup/context/context.ts";
import {RegisterNewUser} from "./registerNewUser.tsx";
import {Room_Form} from "../form/room-detail.tsx";
import {useNavigate} from "react-router-dom";

import {DashSideNav} from "../header-sidenav/dash-side-nav.tsx";
import {AlertRegisterRoom} from "../reusable/alert-register-room.tsx";

import logo from "../../assets/svg/riggs-logo-white.svg";

export const Dashboard = () => {
    const nav = useNavigate()
    const authCtx = useContext(AuthContext)
    const dashCtx = useContext(DashboardContext)
    useAppDispatch();
    const {checkDatabaseHealth} = useApp()
    const {findUserByEmail} = useUser()

    const {user} = useAppSelector((state) => state.user)
    const {database: {components, status}} = useAppSelector((state) => state.app)
    const [loaded, setLoad] = useState<boolean>(false)

    const [search] = useState<string>('')
    const [, setRooms] = useState<Room[]>([])


    const storage = () => {
        let space = components?.diskSpace.details.free as number
        const unite = ['Bytes','Kb','Mb','Gb','Tb'][Math.floor(Math.log2(components?.diskSpace.details.free)/10)]
        let l = 0
        while(space >= 1024 && ++l){
            space = space/1024;
        }
        return (Math.floor(space) + " " + unite)
    }
    
    const convertSecondToTime = (second: number) => {
        const date = new Date(0)
        date.setSeconds(second)
        return date.toISOString().substring(11, 19)
    }

    const fetchUserDate = useCallback(() => {
        if (!user.userID) {
            return findUserByEmail(authCtx.getCookie().email)
        }
    }, [authCtx, findUserByEmail])


    const showSidebar = () => {
        const el = document.querySelector(".dash-sidebar")
        const dashboardContainer = document.querySelector(".dashboard-context-container") as HTMLElement
        if (el && dashboardContainer) {
            dashboardContainer.style.display = 'none'
            el.classList.remove('slide-out')
            el.classList.add('slide-in')
        }
    }

    useEffect(() => {
        if (!loaded) {
            checkDatabaseHealth()
            fetchUserDate()
            setLoad(true)
        }
        if (search.length === 0) {
            setRooms([])
        }
        setInterval(() => checkDatabaseHealth(), (30000 * 2))
    }, [search])

    return (
        <>
            <div className="dashboard-main grid grid-cols-12 pb-[1em]">
                <DashSideNav/>
                <div className="dashboard-context-container grid grid-cols-1 col-start-3 col-end-13 sm:col-start-1 sm:col-end-13 place-content-center justify-center md:col-span-12">
                    <AlertRegisterRoom/>
                    <div className="admin-dash-header grid grid-cols-12 sm:grid-cols-1 md:grid-cols-1 place-content-center p-[10px]">
                        <div className="context-container col-span-1 hidden sm:block md:block lg:block">
                            <div className="context-nav grid grid-cols-1 gap-[.5em] px-[15px] place-content-center justify-center">
                                <div className="search !grid grid-cols-2 !w-full place-content-center justify-center">
                                    <li className={`list-none grid w-full place-content-center justify-start`} onClick={() => nav('/')}>
                                        <img className={`logo w-[50%] cursor-pointer`} src={logo} alt="logo"/>
                                    </li>
                                    <li className='list-none grid w-full place-content-center justify-end' onClick={showSidebar}>
                                        <CiMenuBurger className='!text-[1.5em]'/></li>
                                </div>
                            </div>
                        </div>
                        {
                            components?.db ? <>
                                <div className="system-info-container col-start-2 col-end-13 sm:hidden md:hidden">
                                <div className="sys-context grid grid-cols-5 sm:grid-cols-2 sm:hidden justify-center place-content-center">
                                    <li className='sm:!hidden'>SYS Monitoring</li>
                                    <li className='sm:place-content-center sm:!w-full gap-[.5em]'>
                                        <BsHddNetwork className='sm:!static'/>
                                        <i className='sm:!hidden'><span>System:</span></i>{status}</li>
                                    <li className='sm:place-content-center sm:!w-full'>
                                        <BsDatabase className='sm:mr-[.2em] sm:!static'/>
                                        <i className='sm:!hidden'><span>DB:</span></i>{components?.db.details.database}</li>
                                    <li className='sm:!hidden'>
                                        <CiHardDrive/>
                                        <i className='sm:hidden'><span>Space:</span></i>{storage()}</li>
                                    <li className='sm:!hidden'>
                                        <BiTime/>
                                        <i className='sm:hidden'><span>Up Time:</span></i>{convertSecondToTime(components?.healthActuator.details.uptime)}</li>
                                </div>
                            </div></> : <></>
                        }
                    </div>
                    {
                        dashCtx.getDisplayComponent() == 'dashboard-two' ?
                            <DashboardRoom /> : dashCtx.getDisplayComponent() == 'dashboard-one' ?
                            <Dash/> : dashCtx.getDisplayComponent() == 'add-room' ?
                            <div className='room-ad sm:!h-[100dvh] md:!h-[100dvh]'>
                                <div className="main">
                                <Room_Form title={'New Room'} btn={'Submit'}/>
                                </div>
                            </div> : dashCtx.getDisplayComponent() == 'user-form' ?
                            <RegisterNewUser/> : <></>
                    }
                </div>
            </div>
        </>
    )
}
