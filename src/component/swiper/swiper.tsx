import {useEffect, useState} from "react";

import {Swiper,SwiperSlide} from "swiper/react";

import {Grid, Pagination, Keyboard, Navigation, Mousewheel} from "swiper/modules";
import {useAppSelector} from "../../setup/redux/reduxHook.ts";
import photo from "../../assets/img/dc-street.jpg";

export const SwiperCarousel = () => {
    const {rooms} = useAppSelector((state) => state.room)
    const [breakPoint, setBreakPoint] = useState<{width: number, height: number}>({
        width: 0,
        height: 0
    })

    const handleResize = () => {
      setBreakPoint({
          width: window.innerWidth,
          height: window.innerHeight
      })

    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize()
        const wrapper = document.querySelector('.swiper-wrapper') as HTMLElement
        if (breakPoint.width >= 768 )
            wrapper?.classList.add('custom-swiper-wrapper')
       else
           wrapper?.classList.remove('custom-swiper-wrapper')
    }, [breakPoint.width])

    return (
        <>
            <Swiper
                slidesPerView={breakPoint.width < 768 ? 1 : breakPoint.width >= 1440 ? 4 : 3}
                grid={{
                    rows: breakPoint.width <= 768 ? 1 : 2,
                    fill: 'row'
                }}
                spaceBetween={5}
                pagination={{clickable: true}}
                mousewheel={true}
                keyboard={true}
                navigation={true}
                modules={[Grid, Pagination, Keyboard, Navigation, Mousewheel]}
                className='mySwiper'
            >
                {
                    rooms.map(room => {
                        return (
                            <SwiperSlide key={room.roomID}>
                                <div className="booking-list mt-2">
                                    <div className="images-container" key={`${room.roomID}`}>
                                        <div className="image grid grid-cols-1 sm:flex sm:flex-col sm:mb-2">
                                            <div className="hotel-image col-span-2">
                                                <img className="h-auto max-w-full" src={photo} alt=""/>
                                            </div>
                                            <div className="room-detail col-span-4 w-full sm:mt-1">
                                                <h3 className='title-id grid grid-cols-1'>
                                                    {`${room.roomName}`}
                                                    <span className={`w-fit`}>{room.roomID}</span>
                                                </h3>
                                                <div className="detail">
                                                    <div className="check">
                                                        <li>Room Size:<i>{room.size}</i></li>
                                                    </div>
                                                    {/*<div className="check flex-row">*/}
                                                    {/*    <li>Check-in:<i> {book.arrDate}</i></li>*/}
                                                    {/*    <li>Check-out:<i> {book.depDate}</i></li>*/}
                                                    {/*</div>*/}
                                                    {/*<div className="check flex-row">*/}
                                                    {/*    <li>Price:<i>$162</i></li>*/}
                                                    {/*    <li>Date Book:<i> {book.bookDate}</i></li>*/}
                                                    {/*</div>*/}
                                                </div>
                                                {/*<div className="action-btn">*/}
                                                {/*    <li className=''*/}
                                                {/*        onClick={() => null}*/}
                                                {/*    >*/}
                                                {/*        Book Again*/}
                                                {/*    </li>*/}
                                                {/*    <li className=''*/}
                                                {/*        onClick={() => deleteBooking(book.bookingID)}*/}
                                                {/*    >*/}
                                                {/*        <RiDeleteBinLine className='hidden sm:block'/>*/}
                                                {/*        <span className="sm:!hidden block">Remove</span>*/}
                                                {/*    </li>*/}
                                                {/*</div>*/}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
                <SwiperSlide>
                    <div className="hotel-image col-span-2">
                        <img className="h-auto max-w-full" src={photo} alt=""/>
                    </div>
                    Slide 7
                </SwiperSlide>
                <SwiperSlide>
                    <div className="hotel-image col-span-2">
                    <img className="h-auto max-w-full" src={photo} alt=""/>
                </div>
                    Slide 8
                </SwiperSlide>
                <SwiperSlide>
                    <div className="hotel-image col-span-2">
                        <img className="h-auto max-w-full" src={photo} alt=""/>
                    </div>
                    Slide 9
                </SwiperSlide>

                <SwiperSlide>
                    <div className="hotel-image col-span-2">
                        <img className="h-auto max-w-full" src={photo} alt=""/>
                    </div>
                    Slide 10
                </SwiperSlide>
                <SwiperSlide>
                    <div className="hotel-image col-span-2">
                        <img className="h-auto max-w-full" src={photo} alt=""/>
                    </div>
                    Slide 11
                </SwiperSlide>
            </Swiper>
        </>
    )
}