import {Swiper, SwiperSlide} from "swiper/react";

import {Pagination, Mousewheel, Keyboard} from "swiper/modules";

type Image = {
    images: string[]
}
export const SwiperIndex = (image: Image) => {
    return (
        <>
            <Swiper
                cssMode={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[Pagination, Mousewheel, Keyboard]}
                className='mySwiper hidden sm:block'
            >
                {
                    image.images.map((imgLink: string, index) => {
                        return <SwiperSlide><img src={imgLink} alt={`Photo_${index}`}/></SwiperSlide>
                    })
                }
            </Swiper>
        </>
    )
}