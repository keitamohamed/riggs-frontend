import {RiDeleteBinLine} from "react-icons/ri";

import room1 from "../../assets/img/room-1.jpg"
import room2 from "../../assets/img/room-2.jpg"

export const Booking = () => {

    return (
        <>
            <div className="booking-list">
                <div className="images-container">
                    <div className="image flex sm:flex-col">
                        <img className="h-auto max-w-full" src={room1} alt=""/>
                        <div className="room-detail w-full">
                            <h3>Lagrange City Strasbourg</h3>
                            <div className="detail">
                                <div className="check flex-row">
                                    <li>Check-in<i>Nov 26</i></li>
                                    <li>Check-out<i>Feb 18</i></li>
                                </div>
                                <div className="check">
                                    <li>Booking#:<i>3527219182</i></li>
                                    <li>Room Type:<i>Double</i></li>
                                </div>
                            </div>
                            <div className="action-btn">
                                <button className="">
                                    <p>Total paid</p>
                                    <h4>$134</h4>
                                </button>
                                <button className="">
                                    Book Again
                                </button>
                                <button className="">
                                    <RiDeleteBinLine/>
                                    <li>Remove</li>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="image">
                        <img src={room2} alt=""/>
                        <div className="room-detail">
                            <h3>Hirschen Dorfmuhle</h3>
                            <div className="detail">
                                <div className="check">
                                    <li>Check-in<i>May 9</i></li>
                                    <li>Check-out<i>Aug 2</i></li>
                                </div>
                                <div className="check">
                                    <li>Booking#:<i>78363512</i></li>
                                    <li>Room Type:<i>Single</i></li>
                                </div>
                            </div>
                            <div className="">
                                <button>
                                    <p>Total paid</p>
                                    <h4>$98</h4>
                                </button>
                                <button>
                                    Book Again
                                </button>
                                <button>
                                    <RiDeleteBinLine/>
                                    <i>Remove</i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}