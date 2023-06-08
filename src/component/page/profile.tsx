import {AiFillEdit} from "react-icons/ai";

import img from "../../assets/img/profile-img.jpg"


export const Profile = () => {

    return (
        <>
            <div className="profile_profile">
                <div className="main">
                    <h2>User profile</h2>
                    <div className="content">
                        <div className="user_info flex items-center space-x-4 bg-black">
                            <img src={img} alt="avatar" className="w-24 h-24 rounded"/>
                            <div className="infocol-span-4">
                                <div className="action_btn">
                                    <AiFillEdit/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}