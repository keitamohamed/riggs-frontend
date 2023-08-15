import {Swiper, SwiperSlide} from "swiper/react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Navigation, Pagination, Mousewheel, Keyboard} from "swiper";

import photo from '../../assets/img/dc-street.jpg'
import {RiDeleteBinLine} from "react-icons/ri";
import {useAppSelector} from "../../setup/redux/reduxHook.ts";
import {useBooking} from "../../custom-hook/useBooking.ts";


export const SwiperImage = () => {
    const {booking} = useAppSelector((state) => state.user)
    const {deleteBooking} = useBooking()

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
                        className={`swiper-custom-css`}
                    >
                        {
                            booking.map((book, index) => {

                                return (
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    book.rooms.map((room) => {
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
                                                                    <div className="check flex-row">
                                                                        <li>Price:<i>$162</i></li>
                                                                        <li>Date Book:<i> {book.bookDate}</i></li>
                                                                    </div>
                                                                </div>
                                                                <div className="action-btn">
                                                                    <li className=''
                                                                        onClick={() => null}
                                                                    >
                                                                        Book Again
                                                                    </li>
                                                                    <li className=''
                                                                        onClick={() => deleteBooking(book.bookingID)}
                                                                    >
                                                                        <RiDeleteBinLine className='hidden sm:block'/>
                                                                        <span className="sm:!hidden block">Remove</span>
                                                                    </li>
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