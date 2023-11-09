import {useContext, useEffect, useState} from "react";
import {Swiper,SwiperSlide} from "swiper/react";
import {AiOutlineEdit, AiFillDelete} from 'react-icons/ai'

import {Grid, Pagination, Keyboard, Navigation, Mousewheel} from "swiper/modules";
import {useAppSelector} from "../../setup/redux/reduxHook.ts";
import {useRoom} from "../../custom-hook/useRoom.ts";
import {Room} from "../../interface-type/interface-type.ts";
import {DashboardContext} from "../../setup/context/context.ts";

export const SwiperCarousel = () => {
    const dashCtx = useContext(DashboardContext)
    const {rooms} = useAppSelector((state) => state.room)
    const {setSelectedRoom, onClickDeleteRoom} = useRoom()
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

    const setRoomSelected = (room: Room) => {
        setSelectedRoom(room)
        // dashCtx.setDisplayComponentType('add-room')
        dashCtx.setFormType('add-room', 'Update')
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize()
        const wrapper = document.querySelector('.swiper-wrapper') as HTMLElement
        if (breakPoint.width >= 768 ) {
            wrapper?.classList.add('custom-swiper-wrapper')
        }
       else {
            wrapper?.classList.remove('custom-swiper-wrapper')
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
                        className='mySwiper swiper-dashboard swiper-dashboard-sm !border-0 !border-y-[1px] sm:border-0'
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
                                                    <div className="image-fit-screen col-span-2">
                                                        {
                                                            room.roomName == 'First Lady Suites' ?
                                                                <img className="h-auto max-w-full" src={'/first-lady-suites.jpeg'} alt=""/> :
                                                                <img className="h-auto max-w-full" src={'/room-ava.jpg'} alt=""/>
                                                        }

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
                                                            {
                                                                room?.price ? (
                                                                    <div className="edit-room text-left grid justify-end place-content-end grid-cols-1 pt-[10px]">
                                                                        <li><span className='flex justify-end ml-auto'>A Night: ${room?.price}</span></li>
                                                                    </div>
                                                                ) : ''
                                                            }
                                                            <div className="edit-room flex justify-end gap-[2.5em] pt-[10px]">
                                                                <li onClick={() => setRoomSelected(room)}><AiOutlineEdit className='ml-auto'/></li>
                                                                <li className='delete-icon' onClick={() => onClickDeleteRoom(room.roomID)}>
                                                                    <AiFillDelete className='ml-auto'/>
                                                                    <span className="tooltiptext">Delete room</span>
                                                                </li>
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