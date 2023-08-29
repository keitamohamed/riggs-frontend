import {SwiperCarousel} from "../swiper/swiper.tsx";

import {BiHotel} from "react-icons/bi"
import {AiOutlineUsergroupAdd} from 'react-icons/ai'
import {MdDashboard} from 'react-icons/md'
import {FaHotel} from 'react-icons/fa'
import {Header} from "../header-sidenav/header.tsx";
import {Room_Form} from "../form/room-detail.tsx";
import {useEffect, useState} from "react";

export const Dashboard = () => {
    const [show, setShow] = useState<string>('dash')
    const [props, setProps] = useState<{title: string ,btn: string}>({
        title: '',
        btn: ''
    })

    return (
        <div className='room-ad'>
            {/*<Header/>*/}
            <div className="main">
                <div className="filter-container">
                    <div className="context-container grid grid-cols-3 sm:grid-cols-2 gap-3">
                        <div className="search-container">
                            <li>
                                <input type="text" className="search" placeholder='Enter id or name'/>
                            </li>
                        </div>
                        <div className="type-container">
                            <select
                                data-selected={1}
                                name="numRoom"
                                id="room">
                                <option value=''>Room by Layout</option>
                                <option value='deluxe'>Standard</option>
                                <option value='superior'>Deluxe</option>
                                <option value='suites'>Suite</option>
                                <option value='apartment'>Apartment style</option>
                                <option value='accessible'>Accessible room</option>
                            </select>
                        </div>
                        <div className="new-room grid grid-cols-4 gap-3">
                            <li onClick={() => setShow('dash')}><MdDashboard/></li>
                            <li><AiOutlineUsergroupAdd/></li>
                            <li id='room' onClick={() =>
                            {setShow('add-room'),
                                setProps({
                                    ...props,
                                    title: 'New Room',
                                    btn: 'Submit'
                                })}}><FaHotel/></li>
                            <li><BiHotel/></li>
                        </div>
                    </div>
                </div>
                {
                    show == 'dash' ?
                        <SwiperCarousel/>
                        : show == 'add-room' ?
                            <Room_Form title={props.title} btn={props.btn}/> : ''
                }
            </div>
        </div>
    )
}