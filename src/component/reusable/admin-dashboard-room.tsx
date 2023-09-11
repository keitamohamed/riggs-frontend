import React, {useEffect, useState} from "react";
import {Room} from "../../interface/interface.ts";
import {useRoom} from "../../custom-hook/useRoom.ts";
import {SwiperCarousel} from "../swiper/swiper.tsx";
import {SwiperNested} from "../swiper/swiper-nested.tsx";
import {Room_Form} from "../form/room-detail.tsx";
import {BiHotel} from "react-icons/bi";

type Props = {
    setProps: React.Dispatch<{title: string, btn:string}>;
    setShow: React.Dispatch<string>;
    onChange: (e: any) => void,
    onSubmit: (e: any) => void
}

export const DashboardRoom = () => {
    const {getRoomByName, getRoomByID} = useRoom()

    const [show, setShow] = useState<string>('room-list')
    const [property, setProperty] = useState<{title: string ,btn: string}>({
        title: '',
        btn: ''
    })
    const [search, setSearch] = useState<string>('')
    const [rooms, setRooms] = useState<Room[]>([])



    const onChange = (event: any) => {
        setSearch(event.target.value)
    }

    const onSubmit = (event: any) => {
        event.preventDefault()
        if (search.length === 0) {
            setRooms([])
            return
        }
        if (Number(search)) {
            setRooms(getRoomByID(+search))
            return;
        }
        setRooms(getRoomByName(search))
    }

    useEffect(() => {
        if (search.length === 0) {
            setRooms([])
        }

    }, [search])


    return (
        <div className='room-ad'>
            <div className="main">
                <div className="filter-container">
                    <NavSmallDevices
                        setProps={setProperty}
                        setShow={setShow}
                        onChange={onChange}
                        onSubmit={onSubmit} />
                    <NavLargeDevices
                        setProps={setProperty}
                        setShow={setShow}
                        onChange={onChange}
                        onSubmit={onSubmit}/>
                </div>
                {
                    show == 'room-list' && rooms?.length <= 0 ?
                        <SwiperCarousel />
                        : rooms?.length > 0 ? <SwiperNested rooms={rooms}/> : show == 'add-room' ?
                            <Room_Form title={property.title} btn={property.btn}/> : ''
                }
            </div>
        </div>
    )
}

const NavSmallDevices = (prop: Props) => {

    return (
        <div className="context-container hidden sm:grid grid-cols-9 place-items-end place-items-center sm:gap-y-[2em]">
            <div className="search-context-container grid col-start-1 col-end-8 w-full place-items-center">
                <div className="search-container sm:!w-[90%] sm:border-[0] sm:!border-b-[1px] border-solid sm:pl-[10px] sm:pb-[5px]">
                    <form
                        className='!w-full'
                        action=""
                        onSubmit={prop.onSubmit}
                    >
                        <li>
                            <input type="text"
                                   onChange={prop.onChange}
                                   className="search sm:text-left"
                                   placeholder='Enter id or name'/>
                        </li>
                    </form>
                </div>
            </div>
            <div className="new-room grid col-start-9 col-end-10 place-items-center gap-3">
                <li id='room' className='b-0' onClick={() =>
                {prop.setShow('add-room'),
                    prop.setProps({
                        ...prop,
                        title: 'New Room',
                        btn: 'Submit'
                    })}}><BiHotel/></li>
            </div>
        </div>
    )
}
const NavLargeDevices = (prop: Props) => {

    return (
        <div className="context-container hidden cm:grid grid-cols-9 sm:grid-cols-2 gap-3 sm:gap-y-[2em]">
            <div className="search-container col-start-1 col-end-8 !w-[90%] border-[0] !border-b-[1px] border-solid pl-[10px] pb-[5px]">
                <form
                    className='!w-[80%]'
                    action=""
                    onSubmit={prop.onSubmit}
                >
                    <li>
                        <input type="text"
                               onChange={prop.onChange}
                               className="search"
                               placeholder='Enter id or name'/>
                    </li>
                </form>
            </div>
            <div className="new-room w-full col-start-9 col-end-10 grid gap-3">
                <li id='room' onClick={() =>
                {prop.setShow('add-room'),
                    prop.setProps({
                        ...prop,
                        title: 'New Room',
                        btn: 'Submit'
                    })}}><BiHotel/></li>
            </div>
        </div>
    )
}