import {Swiper, SwiperSlide} from "swiper/react";

import {Navigation, Pagination, Mousewheel, Keyboard} from "swiper/modules";

import {RiDeleteBinLine} from "react-icons/ri";
import {useAppSelector} from "../../setup/redux/reduxHook.ts";
import {useBooking} from "../../custom-hook/useBooking.ts";
import {APIPath} from "../../api-endpoint/url-context-type.ts";


export const SwiperImage = () => {
    const {booking} = useAppSelector((state) => state.user)
    const {deleteBooking} = useBooking()

    const formatPriceInUSCurrency = (total: number) => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        })
        return formatter.format(total)
    }

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
                            booking.map((book) => {

                                return (
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    book.prices.map((price, index) => {
                                        return (
                                            <SwiperSlide>
                                                <div className="booking-list mt-2">
                                                    <div className="images-container" key={`${index}_${book.bookingID}`}>
                                                        <div className="image grid grid-cols-12 w-[96%] sm:w-[100%] ml-auto sm:flex sm:flex-col sm:mb-2 sm:gap-[1.5em]">
                                                            <div className="hotel-image col-span-6">
                                                                {
                                                                    book.rooms.map((r:any) => {
                                                                        return <img className="h-auto max-w-full" src={APIPath.FILE_BASE_DIR_PRODUCTION + APIPath.ROOM_IMAGE_DOWNLOAD(r.roomID)} alt=""/>
                                                                    })
                                                                }
                                                            </div>
                                                            <div className="room-detail col-start-7 col-end-13 w-full sm:mt-1">
                                                                <h3>{price.roomName}</h3>
                                                                <div className="detail">
                                                                    <div className="check">
                                                                        <li>Booking#:<i>{book.bookingID}</i></li>
                                                                        {
                                                                            book.rooms.map((r:any) => {
                                                                                return <li>Room#:<i>{r.roomID}</i></li>
                                                                            })
                                                                        }
                                                                    </div>
                                                                    <div className="check">
                                                                        {
                                                                            book.rooms.map((r:any) => {
                                                                                return <li>Room Name:<i>{r.roomName}</i></li>
                                                                            })
                                                                        }
                                                                        <li>Date Book:<i> {book.bookDate}</i></li>
                                                                    </div>
                                                                    <div className="check flex-row">
                                                                        <li>Check-in:<i> {book.arrDate}</i></li>
                                                                        <li>Check-out:<i> {book.depDate}</i></li>
                                                                    </div>
                                                                    <div className="check flex-row">
                                                                        <li className='price-li'>Price:<i>{formatPriceInUSCurrency(price.price)}</i></li>
                                                                    </div>
                                                                </div>
                                                                <div className="book-delete-btn flex !w-[85%] !justify-end">
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