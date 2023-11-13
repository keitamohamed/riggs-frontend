import React, {useContext, useEffect} from "react";
import {FiArrowDownCircle} from 'react-icons/fi'

import {Carousel} from "../swiper/index-slider.tsx";

import {useRoom} from "../../custom-hook/useRoom.ts";
import {Header} from "../header-sidenav/header.tsx";
import {SideNav} from "../header-sidenav/side-nav.tsx";
import {EmailSection} from "../reusable/emailSection.tsx";

import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../setup/context/context.ts";
import {SwiperIndex} from "../swiper/swiper-index.tsx";
import logo from "../../assets/svg/riggs-logo-navy.svg";

export const Index = () => {
    const nav = useNavigate()
    const authCtx = useContext(AuthContext)
    const {loadRoom} = useRoom()

    const listenScrollEvent = () => {
        const header = document.querySelector('.header')
        if (window.scrollY > 100 && header != null) {
            header.classList.remove('header-transparent')
        } else if (window.scrollY < 100 && header != null) {
            header.classList.add('header-transparent')
        }
    }

    const listenScrollClickEvent = () => {
        const clickElement = document.querySelector('.icon-container')
        clickElement?.addEventListener('click', () => {
            const element = document.querySelector(".intro.intro--no-ctas") as HTMLElement
            const position = element?.getBoundingClientRect().top + window.scrollY
            window.scrollTo({top: position - 205, behavior: 'smooth'})
        })
    }

    const onClickScrollEvent = (className: string) => {
        const element = document.querySelector(`.${className}`) as HTMLElement
        const position = element?.getBoundingClientRect().top + window.scrollY
        window.scrollTo({top: position - 150, behavior: 'smooth'})
    }

    useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent)
        listenScrollClickEvent()
        loadRoom().then(r => r)
        return () => window.addEventListener('scroll', listenScrollEvent)
    }, [])
    return (
        <>
            <SideNav/>
            <div className='index'>
                <Header/>
                <main className='index-main'>
                    <Carousel/>
                    <div className="icon-container">
                        <FiArrowDownCircle/>
                    </div>
                </main>
                <div className="intro intro--no-ctas">
                    <div className="intro-inner no-ctas">
                        <h1 className='sm:!text-[40px]'>riggs washington DC</h1>
                    </div>
                </div>
                <div className="info-container info-container-main">
                    <div className="summary-info grid mt-2 grid-cols-10">
                        <div className="img-container grid col-start-1 col-end-7 sm:col-start-1 sm:col-end-11">
                            <div className="lg-device grid gap-1 grid-cols-2 col-start-1 col-end-7 sm:hidden">
                                <img src={'/atelier-side-table-detail_high-res.jpg'} alt=""/>
                                <img src={'/cafe-riggs-220422-420-credit-caitlin-isola.jpg'} alt=""/>
                            </div>
                            <SwiperIndex images={['/atelier-side-table-detail_high-res.jpg',
                                '/cafe-riggs-220422-420-credit-caitlin-isola.jpg']}/>
                        </div>
                        <div className="text-container col-start-7 col-end-11 sm:col-start-1 sm:col-end-11">
                            <h2 className='sm:!text-[45px]'>Summer in the <br className='sm:hidden'/>City</h2>
                            <h5>Your Next Escape to Washington DC</h5>
                            <div className="disc-container">
                                <p>Enjoy the best of the city this summer with a
                                    stay at Riggs Washington DC. Make the most of
                                    the glorious weather by exploring the National
                                    Mall, the city's world-class museums or venturing
                                    out of town to one of the nearby wineries.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="summary-info grid mt-2 grid-cols-10">
                        <div className="text-container col-start-1 col-end-4 sm:col-start-1 sm:col-end-11 sm:order-2">
                            <h2 className='sm:!text-[45px]'>Café Riggs</h2>
                            <h5>All Day Dining</h5>
                            <div className="disc-container">
                                <p>
                                    Inspired by the bustling brasseries of Europe,
                                    Café Riggs offers traditional grace through a
                                    reimagined lens to bring a modern restaurant to
                                    Washington, D.C. Nestled on the hotel’s ground
                                    floor, the restaurant serves an all-day menu from
                                    the bar and dining room offering a menu of classics
                                    and innovative originals in a stately setting.
                                </p>
                            </div>
                        </div>
                        <div className="img-container grid col-start-5 col-end-11 sm:col-start-1 sm:col-end-11 sm:order-1">
                            <div className="lg-device grid gap-1 grid-cols-2 sm:hidden">
                                <img src={'/cafe.jpeg'} alt=""/>
                                <img src={'/room-3.jpeg'} alt=""/>
                            </div>
                            <SwiperIndex images={['/cafe.jpeg', '/room-3.jpeg']}/>
                        </div>
                    </div>
                    <div className="summary-info grid mt-12 grid-cols-10">
                        <div className="img-container grid col-start-1 col-end-7 sm:col-start-1 sm:col-end-11">
                            <div className="lg-device grid gap-1 grid-cols-2 col-start-1 col-end-7 sm:hidden">
                                <img src={'/silver-lyan-4.jpeg'} alt=""/>
                                <img src={'/35-silverlyan1454.jpeg'} alt=""/>
                            </div>
                            <SwiperIndex images={['/silver-lyan-4.jpeg', '/35-silverlyan1454.jpeg']}/>
                        </div>
                        <div className="text-container col-start-7 col-end-11 sm:col-start-1 sm:col-end-11">
                            <h2 className='sm:!text-[45px]'>Sliver Lyan</h2>
                            <h5>A Reimagined Hotel Bar</h5>
                            <div className="disc-container">
                                <p>
                                    Silver Lyan – nestled in the former building’s original
                                    bank vault – is the first bar outside of Europe from Mr Lyan.
                                    Traveling the world, he sources the weird and wonderful,
                                    using bespoke techniques and experimenting with ingredients
                                    to develop new ways to capture flavor. Silver Lyan draws its
                                    inspiration from D.C.’s incredible depth of culture, food, drink,
                                    people and history to offer a bar that celebrates the notion of
                                    exchange – as well as a damn good time.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="image-container gap-4 grid grid-cols-3">
                        <div className="img-one">
                            <div className="image">
                                <img src={'/5f114359c91bb.jpeg'} alt=""/>
                            </div>
                            <div className="text-container">
                                <h2>Rooms and suites</h2>
                            </div>
                        </div>
                        <div className="img-one">
                            <div className="image">
                                <img src={'/room-3.jpeg'} alt=""/>
                            </div>
                            <div className="text-container">
                                <h5>Eat & Drink</h5>
                            </div>
                        </div>
                        <div className="img-one">
                            <div className="image">
                                <img src={'/60643d4c99091.jpeg'} alt=""/>
                            </div>
                            <div className="text-container">
                                <h5>Meeting And Events</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <EmailSection/>
                <div className="footer py-[20px] px-[20px]">
                    <div className="footer-context grid grid-cols-9 sm:!gap-[1em]">
                        <div className="logo-section col-start-1 col-end-2 sm:col-end-10 sm:w-full ">
                            <li className={`list-none grid w-full place-content-center justify-start sm:place-items-center`}>
                                <img className={`logo w-[90%] sm:w-[40%]`} src={logo} alt="logo"/>
                            </li>
                        </div>
                        <div className="div-section-two grid col-start-3 col-end-4 sm:col-start-1 sm:col-end-10">
                            <li>718 F Street</li>
                            <li>Washington, DC 20000</li>
                            <li>United State</li>
                            <li>+1999 000 0000</li>
                            <li>riggs@gmail.com</li>
                        </div>
                        <div className="div-section-link grid col-start-5 col-end-7 sm:col-start-1 sm:col-end-10 sm:!pl-0">
                            <li onClick={() => onClickScrollEvent('new-letter')}>Contact</li>
                            <li>Gallery</li>
                            <li>Our hotels</li>
                            <li>Press room</li>
                            <li>Terms & conditions</li>
                            <li>FAQs</li>
                        </div>
                        <div className="div-section-developer col-start-8 col-end-10 sm:col-start-1 sm:col-end-10">
                            <div className="copyright grid place-content-start place-items-start">
                                <a className='sm:w-[120px] text-left' href=''>@ Keita Design 2023</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${authCtx.isAuthenticated() ? 'header_cta w-[200px] sm:block' : 'hidden'}`}>
                    <div className="action_container">
                        <p className="action_btn rounded-full" onClick={() => nav("/booking")}>
                            Book a room
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}