import {useContext, useEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {AiFillDelete, AiOutlineEdit} from 'react-icons/ai'
import {IoMdPhotos} from 'react-icons/io'

import {Grid, Keyboard, Mousewheel, Pagination} from "swiper/modules";
import {useAppDispatch, useAppSelector} from "../../setup/redux/reduxHook.ts";
import {useRoom} from "../../custom-hook/useRoom.ts";
import {Room} from "../../interface-type/interface-type.ts";
import {AuthContext, DashboardContext} from "../../setup/context/context.ts";
import {APIPath} from "../../api-endpoint/url-context-type.ts";
import {DOWNLOAD_IMAGE_FILE} from "../../api-endpoint/Request.ts";

export const SwiperCarousel = () => {
    const authCtx = useContext(AuthContext)
    const dashCtx = useContext(DashboardContext)
    const dispatch = useAppDispatch()
    const {rooms} = useAppSelector((state) => state.room)
    const {setSelectedRoom, onClickDeleteRoom} = useRoom()
    const [breakPoint, setBreakPoint] = useState<{width: number, height: number}>({
        width: 0,
        height: 0
    })
    const [img, setImg] = useState('')

    const handleResize = () => {
      setBreakPoint({
          width: window.innerWidth,
          height: window.innerHeight
      })

    }

    const setRoomSelected = (room: Room, actionType: string) => {
        setSelectedRoom(room)
        dashCtx.setFormType('add-room', actionType)
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
                <Swiper
                    slidesPerView={breakPoint.width >= 1440 ? 3 : breakPoint.width >= 768 ? 2 : 1}
                    slidesPerGroup={breakPoint.width >= 768 ? 2 : 1}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    mousewheel={true}
                    keyboard={true}
                    modules={[Grid, Pagination, Keyboard, Mousewheel]}
                    className="mySwiper"
                >
                    {
                        rooms.map((room) => {
                            return (
                                <SwiperSlide>
                                    <div className="room-available mt-2"
                                         onClick={() => console.log('Was click', room.roomID)}
                                    >
                                        <div className="images-container" key={`${room.roomID}`}>
                                            <div className="image grid grid-cols-1 sm:flex sm:flex-col sm:mb-2">
                                                <div className="image-fit-screen col-span-2">
                                                    {

                                                        room.image.length > 0 ?
                                                            <img className="h-auto max-w-full w-full" src={APIPath.FILE_BASE_DIR_PRODUCTION + APIPath.ROOM_IMAGE_DOWNLOAD(room.roomID)} alt={room.image[0].name} /> :
                                                            <img className="h-auto max-w-full w-full" src={'/coming-soon.jpeg'} alt=""/>
                                                    }

                                                </div>
                                                <div className="room-detail col-span-4 w-full sm:mt-1">
                                                    <h3 className='title-id grid grid-cols-2 px-1'>
                                                        <p className='text-left'>{`${room.roomName}`}</p>
                                                        <span className={`w-full text-right`}>{room.roomID}</span>
                                                    </h3>
                                                    <div className="detail grid grid-cols-1 text-left px-1 pt-[1em] gap-[1em]">
                                                        <div className="check text-left grid sm:!grid-cols-2 md:!grid-cols-2 lg:!grid-cols-2 g-[.5em] place-items-center">
                                                            <li className='w-fit'>Size: <i>{room.size}</i></li>
                                                            <li className='w-fit'>View: <i>{room?.detail.view}</i></li>
                                                        </div>
                                                        <div className="edit-room grid grid-cols-2 w-full gap-[1em] place-items-end">
                                                            <div className="grid w-full place-content-start">
                                                                <li className='text-left'><span className='flex place-items-center ml-auto'>${room?.price} a Night</span></li>
                                                            </div>
                                                            <div className="edit-room-btn-container w-full flex justify-end gap-[1em] pt-[10px]">
                                                                <li onClick={() => setRoomSelected(room, 'Update')}><AiOutlineEdit className='ml-auto'/></li>
                                                                <li onClick={() => setRoomSelected(room, 'Update Image')}>
                                                                    <IoMdPhotos className='ml-auto'/>
                                                                </li>
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
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            }

        </>
    )
}