import {SwiperCarousel} from "../swiper/swiper.tsx";

import {BiHotel} from "react-icons/bi"
import {AiOutlineUsergroupAdd} from 'react-icons/ai'
import {FaHotel} from 'react-icons/fa'
import {Header} from "../header-sidenav/header.tsx";

export const Room = () => {

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
                        <div className="new-room grid grid-cols-3 gap-3">
                            <li><AiOutlineUsergroupAdd/></li>
                            <li><FaHotel/></li>
                            <li><BiHotel/></li>
                        </div>
                    </div>
                </div>
                <SwiperCarousel/>
            </div>
        </div>
    )
}