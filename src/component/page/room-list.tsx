import {useContext, useState} from "react";

import {AiOutlineCoffee, AiOutlineClose} from "react-icons/ai";
import {GiBeerBottle} from "react-icons/gi";
import {MdPets} from "react-icons/md";

import {GrPersonalComputer} from "react-icons/gr";

import {useAppSelector} from "../../setup/redux/reduxHook.ts";
import roomImg from "../../assets/img/room-1.jpg"
import {RoomActionContext} from "../../setup/context/context.ts";
import {useBooking} from "../../custom-hook/useBooking.ts";
export const RoomList = () => {
    const ctx = useContext(RoomActionContext)
    const {setReserveRoom} = useBooking()
    const {rooms} = useAppSelector((state) => state.room)
    const [isDeviceBig, setIsDeviceBig] = useState<boolean>(false)

    const setAction = (event: any) => {
        const id = event.target.getAttribute('id') as number
        if (event.target.innerHTML == 'View Room') {
            ctx.setShowDetail(id, true)
        }else {
            ctx.setShowDetail(0, false)
        }
        event.target.innerHTML === 'View Room' ? (event.target.innerHTML = 'Hide Room' ) : (event.target.innerHTML = 'View Room' )
    }
    const setActionClose = () => {
        const element = document.querySelectorAll('.room-action h3')
        element.forEach(e => {
            if (e.innerHTML == 'Hide Room') {
                e.innerHTML = 'View Room'
            }
            ctx.setShowDetail(0, false)
        })
    }

    return (
        <div className='room-list grid grid-cols-2 sm:grid-cols-1 gap-3'>
            {
                rooms.length > 0 ? (
                    rooms.map((room) => {
                        return (
                            <>
                                <div className={`room grid grid-cols-1 sm:grid-cols-10 sm:pb-2`} key={room.roomID}>
                                    <div className="image-container col-span-4 sm:col-span-10 sm:w-[100vw] sm:h-[40vh]">
                                        <img src={roomImg} alt="" className='sm:!object-fill sm:w-[100vw] sm:h-[40vh]' />
                                    </div>
                                    <div className="room-action p-[.8em] grid grid-cols-8 sm:grid-cols-2 sm:col-span-10 sm:mt-6 col-span-6">
                                        <h1 className='!w-full col-span-5 sm:col-end-1 sm:!text-center md:!w-full text-center'>{room.roomName}</h1>
                                        <h3
                                            className='block sm:hidden col-start-6 col-end-8 sm:col-start-2 sm:col-end-2 !w-full'
                                            onClick={(e) => {setIsDeviceBig(true); setAction(e)}}
                                            id={room.roomID}
                                        >View Room</h3>
                                        <h3 className='hidden sm:block col-start-6 col-end-8 sm:col-start-2 sm:col-end-2 !w-full' onClick={setAction}
                                            id={room.roomID}
                                        >View Room</h3>
                                    </div>
                                </div>
                                <div className={`room-detail-container grid ${isDeviceBig && ctx.showDetail() == room.roomID ? 'show-room-detail-lg-device' : ctx.showDetail() == room.roomID ? 'grid-cols-1' : 'hidden'}`}>
                                    <div className="btn-container sm:hidden">
                                        <li
                                            id={room.roomID}
                                            onClick={() => {setIsDeviceBig(false); setActionClose()}}>
                                            <AiOutlineClose/>
                                        </li>
                                    </div>
                                <div className={`room-detail gap-2 sm:grid-cols-1`}>
                                        <div className="image-container w-full">
                                            <img src={roomImg} alt="" />
                                        </div>
                                        <div className="info grid gap-1 w-[90%] sm:!w-full m-auto md:grid-cols-1 sm:p-2 sm:pr-[15px]">
                                            <h2 className='info-room-title'>{room.roomName}</h2>
                                            <div className="disc grid grid-cols-8 gap-3 md:grid-cols-1 sm:grid-cols-1">
                                                <p className={`col-span-6 md:col-span-1 w-[90%] sm:w-full mr-1 sm:grid-cols-1 text-left`}>{room.description}</p>
                                                <div className="grid !place-content-center col-start-7 col-end-9 sm:grid-cols-2 sm:col-span-8">
                                                    <h2 className={`flex w-full flex-col md:grid-cols-1 sm:grid-cols-1 sm:!text-left md:!text-left`}>{`$${room.price} / NIGHT `}
                                                        <p className='sm:!text-left md:!text-left sm:w-[90%]'>EXCLUDING TAXES & FEED</p>
                                                    </h2>
                                                    <h2
                                                        className='w-full sm:w-fit sm:absolute mt-4 sm:!right-1 sm:!bottom-auto sm:ml-0'
                                                        onClick={() => setReserveRoom(room.roomID)}
                                                    >
                                                        Reserve
                                                    </h2>
                                                </div>

                                            </div>
                                            <div className="details grid grid-cols-4 sm:!w-full sm:mt-10 md:mt-10">
                                                <li key={`${room.roomID}_animal`}>
                                                    <div className="img-wrap amenity-icon">
                                                        <AiOutlineCoffee/>
                                                    </div>
                                                    <span className="room-amenities-item-hint">
                                                    Coffee
                                                </span>
                                                </li>
                                                <li key={`${room.roomID}_beer`}>
                                                    <div className="img-wrap amenity-icon">
                                                        <GiBeerBottle/>
                                                    </div>
                                                    <span className="room-amenities-item-hint">
                                                    Beer
                                                </span>
                                                </li>
                                                <li key={`${room.roomID}_pet`}>
                                                    <div className="img-wrap amenity-icon">
                                                        <MdPets/>
                                                    </div>
                                                    <span className="room-amenities-item-hint">
                                                    Pet Friendly
                                                </span>
                                                </li>
                                                <li key={`${room.roomID}_comp`}>
                                                    <div className="img-wrap amenity-icon">
                                                        <GrPersonalComputer/>
                                                    </div>
                                                    <span className="room-amenities-item-hint">
                                                    Computer
                                                </span>
                                                </li>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })
                ) : ''
            }
        </div>

    )

}