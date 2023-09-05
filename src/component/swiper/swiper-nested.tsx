
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Grid} from "swiper/modules";

import {Room} from "../../interface/interface.ts";
import photo from "../../assets/img/dc-street.jpg";
import {useEffect, useState} from "react";

type Prop = {
    rooms: Room[]
}
export const SwiperNested = (props: Prop) => {

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
        const wrapper = document.querySelector('.swiper-nested') as HTMLElement
        const image_container = document.querySelector('.image') as HTMLElement

        if (breakPoint.width <= 768 ) {
            wrapper?.classList.add('swiper-nested-sm')
            // wrapper.style.height = `${image_container.clientHeight + 100}px`
        } else
            wrapper?.classList.remove('swiper-nested-sm')
    }, [breakPoint.width])

    return (
        <>
            <Swiper
                className="swiper-nested sm:!w-[100%]"
                slidesPerView={1}
                spaceBetween={50}
                pagination={{
                    clickable: true,
                }}
                grid={{
                    rows: 1,
                    fill: 'row'
                }}
                modules={[Pagination]}
            >
                {
                    props.rooms.map(room => {
                        return (
                            <SwiperSlide>
                                <Swiper
                                    className="mySwiper-two swiper-v"
                                    direction={'vertical'}
                                    slidesPerView={1}
                                    spaceBetween={50}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    grid={{
                                        rows: 1,
                                        fill: 'row'
                                    }}
                                    modules={[Pagination]}
                                >
                                    <SwiperSlide key={room.roomID}>
                                        <div className="room-available mt-2"
                                             onClick={() => console.log('Was click', room.roomID)}
                                        >
                                            <div className="images-container sm:!block" key={`${room.roomID}`}>
                                                <div className="image grid grid-cols-1 sm:flex sm:flex-col sm:mb-2">
                                                    <div className="image-fit-screen">
                                                        <img className="h-auto max-w-full" src={photo} alt=""/>
                                                    </div>
                                                    <div className="room-detail col-span-4 w-full sm:mt-1">
                                                        <h3 className='title-id grid grid-cols-12 px-1'>
                                                            <p className='col-start-1 col-end-8 text-left'>{`${room.roomName}`}</p>
                                                            <span className={`w-full col-start-8 col-end-13 text-right`}>{room.roomID}</span>
                                                        </h3>
                                                        <div className="detail text-left px-1 pt-[.5em]">
                                                            <div className="check text-left grid sm:!grid-cols-1 md:!grid-cols-2 lg:!grid-cols-2">
                                                                <li>Size:<i>{room.size}</i></li>
                                                                <li>View:<i>{room?.detail.view}</i></li>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide><div className="hotel-image col-span-2">
                                        <img className="h-auto max-w-full" src={photo} alt=""/>
                                    </div></SwiperSlide>
                                </Swiper>
                            </SwiperSlide>
                        )
                    })
                }
                <SwiperSlide>Horizontal Slide 3</SwiperSlide>
                <SwiperSlide>Horizontal Slide 4</SwiperSlide>
            </Swiper>
        </>
    )
}