import {AiFillEdit} from "react-icons/ai";
import {LuEdit2} from "react-icons/lu";

import img from "../../assets/img/profile-img.jpg"


export const Profile = () => {
    return (
        <>
            <div className="profile_profile">
                <div className="main sm:p-0">
                    <div className="content">
                        <div className="user_info flex items-center
                        space-x-6 sm:grid sm:grid-cols-1 border-1 sm:border-0">
                            <img src={img} alt="avatar" className="w-24 h-24 rounded sm:w-full sm:h-full"/>
                            <div className="info-container infocol-span-6
                            flex items-center space-x-4 w-full">
                                <div className="info grow sm:p-2">
                                    <h2>Andres Botero</h2>
                                    <div className="user-detail">
                                        <p>keitamohamed12@gmail.com</p>
                                        <p>111 28th Street NW, Roanoke NC</p>
                                    </div>

                                </div>
                                <div className="action_btn flex-none w-fit
                                grid grid-cols-2 justify-center
                                sm:rounded-full sm:grid-cols-1 bg-[#EEEEEE]
                                p-2
                                top-0 right-2
                                sm:-top-5
                                sm:bg-[#ED2B2A] sm:p-4">
                                    <LuEdit2 className="text-1xl sm:text-white text-[#19A7CE]"/>
                                    <p className="sm:hidden text-[#19A7CE]">Edit</p>
                                </div>
                            </div>
                        </div>
                        <div className="booking-detail grid grid-cols-3 mt-1 w-full sm:grid-cols-1">
                            <div className="room-book ">
                                <div className="num-room">
                                    <h1>6</h1>
                                    <p>Booking i've made</p>
                                </div>
                            </div>
                            <div className="room-book">
                                <div className="num-room">
                                    <h1>$189</h1>
                                    <p>Average cost for each room</p>
                                </div>
                            </div>
                            <div className="room-book">
                                <div className="num-room">
                                    <h1>$6123</h1>
                                    <p>Total amount spent</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}