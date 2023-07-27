import {AiFillEdit} from "react-icons/ai";
import {LuEdit2} from "react-icons/lu";

import img from "../../assets/img/profile-img.jpg"
import {useUser} from "../../custom-hook/useUser.ts";
import {useAppSelector} from "../../setup/redux/reduxHook.ts";
import {useEffect} from "react";
import {SwiperImage} from "../reusable/swiper-image.tsx";


export const Profile = () => {
    const {user} = useAppSelector((state) => state.user)
    const {credentials} = useAppSelector((state) => state.auth)
    const {findUserByEmail, userTotalBooking} = useUser()

    useEffect(() => {
        findUserByEmail(credentials.email)
    }, [])

    return (
        <>
            <div className="profile_profile">
                <div className="main sm:p-0">
                    <div className="content">
                        <div className="user_info flex items-center
                        space-x-6 sm:grid sm:grid-cols-1 border-1 sm:border-0">
                            <img src={img} alt="avatar" className="w-24 h-24 rounded sm:w-full sm:h-full"/>
                            <div className="info-container infocol-span-6
                            flex items-center space-x-4 w-full sm:mb-5">
                                <div className="info grow sm:p-2">
                                    <h2>{`${user.firstName + " " + user.lastName}`}</h2>
                                    <div className="user-detail">
                                        <p>{user.auth.email}</p>
                                        <p>{user.address.street + '\n' +
                                            user.address.city + ", " + user.address.state +
                                            " " + user.address.zipcode}</p>
                                    </div>

                                </div>
                                <div className="action_btn flex-none w-fit
                                grid grid-cols-2 justify-center
                                sm:rounded-full sm:grid-cols-1 bg-[#EEEEEE]
                                p-2
                                top-0 right-2
                                sm:-top-5
                                sm:bg-[#ED2B2A] sm:p-4">
                                    <LuEdit2 className="text-1xl hidden sm:block sm:text-white text-[#19A7CE]"/>
                                    <AiFillEdit className="text-1xl block sm:hidden sm:text-white text-[#19A7CE]"/>
                                    <p className="sm:hidden text-[#19A7CE]">Edit</p>
                                </div>
                            </div>
                        </div>
                        <div className="booking-detail grid grid-cols-2 mt-1 w-full sm:grid-cols-1">
                            <div className="room-book ">
                                <div className="num-room">
                                    <h1>{userTotalBooking()}</h1>
                                    <p>Booking i've made</p>
                                </div>
                            </div>
                            <div className="room-book">
                                <div className="num-room">
                                    <h1>$189</h1>
                                    <p>Average cost for each room</p>
                                </div>
                            </div>
                        </div>
                        <SwiperImage/>
                    </div>
                </div>
            </div>
        </>
    )
}