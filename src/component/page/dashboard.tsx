import React, {useEffect, useState} from "react";

import {AiOutlineUsergroupAdd} from 'react-icons/ai'
import {CiMenuBurger, CiHardDrive} from 'react-icons/ci'
import {BsHddNetwork, BsDatabase} from 'react-icons/bs'
import {BiTime} from 'react-icons/bi'

import {MdDashboard} from 'react-icons/md'
import {FaHotel} from 'react-icons/fa'

import {Room} from "../../interface/interface.ts";

import {DashboardRoom} from "../reusable/admin-dashboard-room.tsx";
import {useAppSelector} from "../../setup/redux/reduxHook.ts";
import {useApp} from "../../custom-hook/useApp.ts";
import {Dash} from "../reusable/dash.tsx";

export const Dashboard = () => {
    const {checkDatabaseHealth} = useApp()
    const {database: {components, status}} = useAppSelector((state) => state.app)
    const [show, setShow] = useState<string>('dash')
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

    useEffect(() => {
        if (!loaded) {
            checkDatabaseHealth()
            setLoad(true)
        }
        if (search.length === 0) {
            setRooms([])
        }
        setInterval(() => checkDatabaseHealth(), (30000 * 2))
    }, [search])

    return (
        <>
            <div className="admin-dash-header">
                {
                    components?.db ? <><div className="system-info-container">
                        <div className="sys-context grid grid-cols-5 sm:grid-cols-4">
                            <li className='sm:hidden'>SYS Monitoring</li>
                            <li className=''>
                                <BsHddNetwork/>
                                <i className='sm:hidden'><span>System:</span></i>{status}</li>
                            <li className=''>
                                <BsDatabase className='sm:mr-[.2em]'/>
                                <i className='sm:hidden'><span>DB:</span></i>{components?.db.details.database}</li>
                            <li className=''>
                                <CiHardDrive/>
                                <i className='sm:hidden'><span>Space:</span></i>{storage()}</li>
                            <li className=''>
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
                        <div className="list-container col-start-10 col-end-13 w-full grid grid-cols-3 gap-[1em]">
                            <li><AiOutlineUsergroupAdd/></li>
                            <li id='room' onClick={() =>
                            {setShow('dash-room')}}><FaHotel/></li>
                            <li onClick={() => setShow('dash')}><MdDashboard/></li>
                        </div>
                    </div>
                </div>
            </div>
            {
               show === 'dash-room' ? <DashboardRoom /> : <Dash/>
            }
        </>
    )
}
