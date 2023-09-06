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
        const swiper = document.querySelector('.swiper-dashboard') as HTMLElement
        if (breakPoint.width >= 768 ) {
            wrapper?.classList.add('custom-swiper-wrapper')
            swiper.classList.add('swiper-dashboard-sm')
        }
       else {
            wrapper?.classList.remove('custom-swiper-wrapper')
            swiper.classList.add('swiper-dashboard-sm')
        }
    }, [breakPoint.width])

    return (
        <>
            {
                rooms.length > 0 ?
                    <Swiper
                        slidesPerView={breakPoint.width < 768 ? 1 : breakPoint.width >= 1440 ? 3 : 2}
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
                        className='mySwiper swiper-dashboard !border-0 !border-y-[1px] sm:border-0'
                    >
                        {
                            rooms.map(room => {
                                return (
                                    <SwiperSlide key={room.roomID}>
                                        <div className="room-available mt-2"
                                             onClick={() => console.log('Was click', room.roomID)}
                                        >
                                            <div className="images-container" key={`${room.roomID}`}>
                                                <div className="image grid grid-cols-1 sm:flex sm:flex-col sm:mb-2">
                                                    <div className="hotel-image col-span-2">
                                                        <img className="h-auto max-w-full" src={photo} alt=""/>
                                                    </div>
                                                    <div className="room-detail col-span-4 w-full sm:mt-1">
                                                        <h3 className='title-id grid grid-cols-12 px-1'>
                                                            <p className='col-start-1 col-end-8 text-left'>{`${room.roomName}`}</p>
                                                            <span className={`w-full col-start-8 col-end-13 text-right`}>{room.roomID}</span>
                                                        </h3>
                                                        <div className="detail text-left px-1 pt-[.5em]">
                                                            <div className="check text-left sm:!grid-cols-1 md:!grid-cols-2 lg:!grid-cols-2">
                                                                <li>Size:<i>{room.size}</i></li>
                                                                <li>View:<i>{room?.detail.view}</i></li>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper> : ''
            }

        </>
    )
}