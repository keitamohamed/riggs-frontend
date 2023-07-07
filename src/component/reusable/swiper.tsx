import video from '../../assets/video/Riggs Summer.mp4'
import photo from '../../assets/img/dc-street.jpg'
import "swiper/css/pagination";
export const Carousel = () => {

    return (
        <div className='slide'>
            <div className="slider_inner reform-slider-init">
                <div className="slide_slide reform-slide reform-slide-current">
                    {/*<picture>*/}
                    {/*    /!*<source srcSet={photo}/>*!/*/}
                    {/*    <img src={photo} alt=""/>*/}
                    {/*</picture>*/}
                    <video src={video} autoPlay={true} loop={true} muted={true} />
                </div>
            </div>
        </div>
    )
}
