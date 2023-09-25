import React, {useCallback, useContext, useEffect, useState} from "react";

import {AiOutlineUsergroupAdd, AiFillHome, AiOutlineForm, AiOutlineTable, AiOutlineLeft} from 'react-icons/ai'
import {CiMenuBurger, CiHardDrive} from 'react-icons/ci'
import {BsHddNetwork, BsDatabase} from 'react-icons/bs'
import {BiTime} from 'react-icons/bi'
import {IoIosBed} from 'react-icons/io'

import {FaHotel} from 'react-icons/fa'

import {Room} from "../../interface/interface.ts";

import {DashboardRoom} from "../reusable/admin-dashboard-room.tsx";
import {useAppDispatch, useAppSelector} from "../../setup/redux/reduxHook.ts";
import {useApp} from "../../custom-hook/useApp.ts";
import {Dash} from "../reusable/dash.tsx";

import profile from "../../assets/img/profile-img.jpg"
import {useUser} from "../../custom-hook/useUser.ts";
import {AuthContext, DashboardContext} from "../../setup/context/context.ts";
import {RegisterNewUser} from "./registerNewUser.tsx";
import {Room_Form} from "../form/room-detail.tsx";
import {roomAction} from "../../setup/redux/room.ts";

export const Dashboard = () => {
    const authCtx = useContext(AuthContext)
    const dashCtx = useContext(DashboardContext)
    const dispatch = useAppDispatch()
    const {checkDatabaseHealth} = useApp()
    const {findUserByEmail} = useUser()
    const {user} = useAppSelector((state) => state.user)
    const {database: {components, status}} = useAppSelector((state) => state.app)
    const [loaded, setLoad] = useState<boolean>(false)

    const [search, setSearch] = useState<string>('')
    const [rooms, setRooms] = useState<Room[]>([])


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
    
    
    const updatedAction = () => {
        const ele: HTMLElement = document.querySelector('.update-btn-container') as HTMLElement;
        ele.classList.toggle("h-full")
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
            <div className="dashboard-main grid grid-cols-12">
                <div className="dash-sidebar col-span-2">
                    <div className="sidebar-context grid">
                        <div className="avatar flex gap-3 place-content-center justify-center">
                            <div className="image-container">
                                <img className="w-12 h-12 rounded-full" src={profile} alt="img"/>
                            </div>
                            <div className="avatar-name-container grid place-content-center">
                                <h2>{user.firstName + ' ' + user.lastName}</h2>
                            </div>
                        </div>
                        <div className="dash-btn-container grid">
                            <li className='' onClick={
                                () => dashCtx.setDisplayComponentType('dashboard-one')}>
                                <span>Main Dash</span><AiFillHome/>
                            </li>
                            <li onClick={() => dashCtx.setDisplayComponentType('dashboard-two')}
                            >
                                <span>Room Dash</span> <FaHotel/>
                            </li>
                        </div>
                        <div className="dash-buttons-container grid">
                            <li className='' onClick={() => {
                                dashCtx.setDisplayComponentType('user-form')}}>
                                <AiOutlineUsergroupAdd/><span>User Form</span></li>
                            <li className=''
                                onClick={() => {
                                    dashCtx.setDisplayComponentType('add-room'), dispatch(roomAction.reSetError())
                                }}
                            ><IoIosBed/><span>Room Form</span></li>
                            <li><AiOutlineTable/> <span>Tables</span></li>
                        </div>
                        <div className="dash-buttons-container-update grid">
                            <span className='updated-btn w-full'
                                  onClick={updatedAction}
                            >
                                Updated
                                <AiOutlineLeft/>
                            </span>
                            <div className="update-btn-container">
                                <li className=''><AiOutlineForm/><span>Updated User</span></li>
                                <li className=''><AiOutlineForm/><span>Updated Room</span></li>
                                <li><AiOutlineTable/> <span>Tables</span></li>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dashboard-context-container col-start-3 col-end-13 grid grid-cols-1">
                    <div className="admin-dash-header">
                        {
                            components?.db ? <><div className="system-info-container">
                                <div className="sys-context grid grid-cols-5 sm:grid-cols-2 justify-center place-content-center">
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

                        <div className="context-container">
                            <div className="context-nav grid grid-cols-12 gap-[.5em] px-[15px]">
                                <div className="search col-span-9">
                                    <CiMenuBurger/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        dashCtx.getDisplayComponent() == 'dashboard-two' ?
                            <DashboardRoom /> : dashCtx.getDisplayComponent() == 'dashboard-one' ?
                            <Dash/> : dashCtx.getDisplayComponent() == 'add-room' ?
                            <div className='room-ad'>
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
