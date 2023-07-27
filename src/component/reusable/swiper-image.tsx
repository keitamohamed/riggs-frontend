import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination, Mousewheel, Keyboard} from "swiper";

import photo from '../../assets/img/dc-street.jpg'
import {RiDeleteBinLine} from "react-icons/ri";
import {useAppSelector} from "../../setup/redux/reduxHook.ts";


export const SwiperImage = () => {
    const {booking} = useAppSelector((state) => state.user)

    return (
        <>
            {
                booking.length >  0 ? (
                    <Swiper
                        cssMode={true}
                        navigation={true}
                        pagination={{clickable: true}}
                        mousewheel={true}
                        keyboard={true}
                        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                        className='swiper-custom-css'
                    >

                        {
                            booking.map((book, index) => {
                                return (
                                    book.rooms.map(room => {
                                        return (
                                            <SwiperSlide>
                                                <div className="booking-list mt-2">
                                                    <div className="images-container" key={`${index}_${book.bookingID}`}>
                                                        <div className="image grid grid-cols-6 sm:flex sm:flex-col sm:mb-2">
                                                            <div className="hotel-image col-span-2">
                                                                <img className="h-auto max-w-full" src={photo} alt=""/>
                                                            </div>
                                                            <div className="room-detail col-span-4 w-full sm:mt-1">
                                                                <h3>{room.roomName}</h3>
                                                                <div className="detail">
                                                                    <div className="check">
                                                                        <li>Booking#:<i>{book.bookingID}</i></li>
                                                                        <li>Room Type:<i>Double</i></li>
                                                                    </div>
                                                                    <div className="check flex-row">
                                                                        <li>Check-in:<i> {book.arrDate}</i></li>
                                                                        <li>Check-out:<i> {book.depDate}</i></li>
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
                                                </div>
                                            </SwiperSlide>
                                        )
                                    })
                                )
                            })
                        }
                    </Swiper>
                ) : <></>
            }

        </>
    )
}