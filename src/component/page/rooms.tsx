import {AiOutlineCoffee} from "react-icons/ai";
import {GiBeerBottle} from "react-icons/gi";
import {MdPets} from "react-icons/md";
import {GrPersonalComputer} from "react-icons/gr";

import {useAppSelector} from "../../setup/redux/reduxHook.ts";

import roomImg from "../../assets/img/room-1.jpg"
export const Rooms = () => {
    const {rooms} = useAppSelector((state) => state.room)

    return (
        <div className={`room-list`}>
            <h1>ROOM</h1>
            {
                rooms.length > 0 ? (
                    rooms.map((room) => {
                        return (
                            <>
                                <div className={`room grid grid-cols-10`} key={room.roomID}>
                                    <div className="image-container col-span-3">
                                        <img src={roomImg} alt="" className={`w-full`} />
                                    </div>
                                    <div className="room-action grid grid-cols-2 col-span-7">
                                        <h1>{room.roomName}</h1>
                                        <h3>View Rooms</h3>
                                    </div>
                                </div>
                                <div className="room-detail grid grid-cols-2">
                                    <div className="image-container w-full">
                                        <img src={roomImg} alt="" />
                                    </div>
                                    <div className="info grid gap-1">
                                        <h2>{room.roomName}</h2>
                                        <div className="disc grid grid-cols-8">
                                            <p className={`col-span-5`}>{room.description}</p>
                                            <h3 className={`col-span-3`}>{`${245} / NIGHT `}<p>EXCLUDING TAXES & FEED</p></h3>
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