import {AiOutlineCoffee} from "react-icons/ai";
import {GiBeerBottle} from "react-icons/gi";
import {MdPets} from "react-icons/md";
import {GrPersonalComputer} from "react-icons/gr";

import {useAppSelector} from "../../setup/redux/reduxHook.ts";

import roomImg from "../../assets/img/room-1.jpg"
import {useContext, useEffect, useState} from "react";
import {RoomActionContext} from "../../setup/context/context.ts";
import {useBooking} from "../../custom-hook/useBooking.ts";
export const Rooms = () => {
    const ctx = useContext(RoomActionContext)
    const {setReserveRoom} = useBooking()
    const {rooms} = useAppSelector((state) => state.room)
    const [actionButton, setActionButton] = useState({
        h3: 'View Room'
    })
    
    const action = (id: number) => {
        if (actionButton.h3 == 'View Room') {
            ctx.setShowDetail(id, true)
        }else {
            ctx.setShowDetail(0, false)
        }
        setActionButton({
            ...actionButton,
            h3: actionButton.h3 == 'View Room' ? 'Hide Room' : 'View Room'
        })
    }

    useEffect(() => {

    }, [])

    return (
        <div className='room-list'>
            {
                rooms.length > 0 ? (
                    rooms.map((room) => {
                        return (
                            <>
                                <div className={`room grid grid-cols-10 sm:pb-2`} key={room.roomID}>
                                    <div className="image-container col-span-4 sm:col-span-10 sm:w-[100vw] sm:h-[40vh]">
                                        <img src={roomImg} alt="" className='sm:!object-fill sm:w-[100vw] sm:h-[40vh]' />
                                    </div>
                                    <div className="room-action grid grid-cols-2 sm:grid-cols-1 sm:col-span-10 sm:mt-6 col-span-6">
                                        <h1 className='sm:!w-full sm:!text-center md:!w-full'>{room.roomName}</h1>
                                        <h3 className='sm:!w-[50%] sm:mt-10' onClick={() => action(room.roomID)}>{actionButton.h3}</h3>
                                    </div>
                                </div>
                                <div className={`room-detail gap-2 sm:grid-cols-1 md:grid-cols-1 ${ctx.getShowDetail() ? 'grid grid-cols-2' : 'hidden'} `}>
                                    <div className="image-container w-full">
                                        <img src={roomImg} alt="" />
                                    </div>
                                    <div className="info grid gap-1 md:grid-cols-1 sm:p-2">
                                        <h2 className='info-room-title'>{room.roomName}</h2>
                                        <div className="disc grid grid-cols-8 gap-3 md:grid-cols-1 sm:grid-cols-1">
                                            <p className={`col-start-1 col-end-7 md:col-span-1 mr-1 sm:grid-cols-1`}>{room.description}</p>
                                            <div className="grid grid-cols-1 col-start-7 col-end-9 sm:grid-cols-2 sm:col-span-8">
                                                <h2 className={`flex flex-col w-fit md:grid-cols-1 sm:grid-cols-1 sm:w-full md:w-full sm:!text-left md:!text-left`}>{`$${245} / NIGHT `}
                                                    <p className='sm:!text-left md:!text-left'>EXCLUDING TAXES & FEED</p>
                                                </h2>
                                                <h2
                                                    className='sm:absolute sm:!right-1 sm:!bottom-auto sm:ml-0 lg:ml-6 xl:ml-12'
                                                    onClick={() => setReserveRoom(room.roomID)}
                                                >
                                                    Reserve
                                                </h2>
                                            </div>

                                        </div>
                                        <div className="details grid grid-cols-4 sm:!w-full sm:mt-10 md:mt-10">
                                            <li>
                                                <div className="img-wrap amenity-icon">
                                                    <AiOutlineCoffee/>
                                                </div>
                                                <span className="room-amenities-item-hint">
                                                    Coffee
                                                </span>
                                            </li>
                                            <li>
                                                <div className="img-wrap amenity-icon">
                                                    <GiBeerBottle/>
                                                </div>
                                                <span className="room-amenities-item-hint">
                                                    Beer
                                                </span>
                                            </li>
                                            <li>
                                                <div className="img-wrap amenity-icon">
                                                    <MdPets/>
                                                </div>
                                                <span className="room-amenities-item-hint">
                                                    Pet Friendly
                                                </span>
                                            </li>
                                            <li>
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
                            </>
                        )
                    })
                ) : ''
            }
        </div>

    )

}