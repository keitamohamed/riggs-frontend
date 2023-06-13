import {RiDeleteBinLine} from "react-icons/ri";

import room1 from "../../assets/img/room-1.jpg"
import {useAppSelector} from "../../setup/redux/reduxHook.ts";

export const Booking = () => {
    const {booking} = useAppSelector((state) => state.user)

    return (
        <>
            <div className="booking-list mt-2">
                {
                    booking.map((book, index) => {
                        return (
                            <div className="images-container" key={`${index}_${book.bookingID}`}>
                                <div className="image grid grid-cols-6 sm:flex sm:flex-col sm:mb-2">
                                    <div className="hotel-image col-span-2">
                                        <img className="h-auto max-w-full" src={room1} alt=""/>
                                    </div>
                                    <div className="room-detail col-span-4 w-full sm:mt-1">
                                        <h3>Lagrange City Strasbourg</h3>
                                        <div className="detail">
                                            <div className="check">
                                                <li>Booking#:<i>{book.bookingID}</i></li>
                                                <li>Room Type:<i>Double</i></li>
                                            </div>
                                            <div className="check flex-row">
                                                <li>Check-in:<i> {book.fromDate}</i></li>
                                                <li>Check-out:<i> {book.toDate}</i></li>
                                            </div>
                                        </div>
                                        <div className="action-btn">
                                            <button className="">
                                                <p>Total paid</p>
                                                $134
                                            </button>
                                            <button className="">
                                                Book Again
                                            </button>
                                            <button className="" name={book.bookingID}>
                                                <RiDeleteBinLine/>
                                                <li>Remove <i className="sm:hidden">from list</i></li>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </>
    )
}