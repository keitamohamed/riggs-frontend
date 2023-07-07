import {AiOutlineCoffee} from "react-icons/ai";
import {GiBeerBottle} from "react-icons/gi";
import {MdPets} from "react-icons/md";
import {GrPersonalComputer} from "react-icons/gr";

import {useAppSelector} from "../../setup/redux/reduxHook.ts";

import roomImg from "../../assets/img/room-1.jpg"
import {useContext, useEffect, useState} from "react";
import {RoomActionContext} from "../../setup/context/context.ts";
export const Rooms = () => {
    const ctx = useContext(RoomActionContext)
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
                                <div className={`room grid grid-cols-10`} key={room.roomID}>
                                    <div className="image-container col-span-3">
                                        <img src={roomImg} alt="" className={``} />
                                    </div>
                                    <div className="room-action grid grid-cols-2 col-span-7">
                                        <h1>{room.roomName}</h1>
                                        <h3 onClick={() => action(room.roomID)}>{actionButton.h3}</h3>
                                    </div>
                                </div>
                                <div className={`room-detail gap-2 ${ctx.getShowDetail() ? 'grid grid-cols-2' : 'hidden'} `}>
                                    <div className="image-container w-full">
                                        <img src={roomImg} alt="" />
                                    </div>
                                    <div className="info grid gap-1">
                                        <h2 className='info-room-title'>{room.roomName}</h2>
                                        <div className="disc grid grid-cols-8 gap-3">
                                            <p className={`col-span-6 mr-1`}>{room.description}</p>
                                            <h2 className={`col-span-2 flex flex-col w-fit`}>{`$${245} / NIGHT `}<p>EXCLUDING TAXES & FEED</p></h2>
                                        </div>
                                        <div className="details grid grid-cols-4">
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