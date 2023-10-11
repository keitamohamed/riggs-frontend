
import {useAppSelector} from "../../setup/redux/reduxHook.ts";
import {LineChartComp} from "../chart/line.tsx";
import {DoughnutChartComp} from "../chart/doughnut.tsx";
import {RequestTable} from "../table/request-table.tsx";
import {bookingData} from "../../api-endpoint/fake-booking-data.ts";

import {GraphCard} from "./graph-card.tsx";
import pImgae from '../../assets/img/profile-img.jpg'
import {useApp} from "../../custom-hook/useApp.ts";
import {BookingChartComp} from "../chart/booking-graph.tsx";
import {BookingData} from "../../interface/interface-type.ts";

export const Dash = () => {
    const {getNumberOfRoom, getNumberUsers} = useApp()
    const {rooms} = useAppSelector((state) => state.room)
    const {
        exchange200,
        exchange404,
        exchange400,
        exchange500,
        chartData
    } = useAppSelector((state) => state.app)

    const booking: BookingData[] = [
        {
            month: 'January',
            book: 65,
            amount: 1245.23
        },
        {
            month: 'February',
            book: 36,
            amount: 1080.23
        },
        {
            month: 'March',
            book: 58,
            amount: 1215.23
        }
    ]


    return (
        <div className='dashboard'>
            <div className="dashboard-main">
                <div className="graph-card-container grid grid-cols-12 gap-[1em] sm:p-[10px] md:p-[10px] lg:p-[10px]">
                    <div className="top-deals-container col-span-3 sm:col-span-12 md:col-span-12 lg:col-span-5 bg-[#2a3447]">
                        <div className="most-recent-booking">
                            <div className="title-container">
                                <h1>Recent Booking</h1>
                            </div>
                            <div className="context-container">
                                {
                                    bookingData.map((book, index) => {
                                        return (
                                            <div className="book-container flex gap-[.5em]" key={index}>
                                                <div className="avatar flex gap-[.7em]">
                                                    <img className='w-10 h-10 rounded-full' src={pImgae} alt=""/>
                                                    <div className="avatar-context grid grid-cols-1">
                                                        <h5>{book.customer.name}</h5>
                                                        <p>{book.customer.email}</p>
                                                    </div>
                                                </div>
                                                <p className='book-price grid justify-center place-content-center'>${`${book.price}`}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="card-main-container grid grid-cols-1 col-start-4 col-end-10 sm:col-span-12 md:col-span-12 lg:col-start-6 lg:col-end-13">
                        <div className="card-container grid grid-cols-2 gap-[.5em] md:grid-cols-2 m-auto w-full">
                            <GraphCard title={'Total Rooms'} size={getNumberOfRoom()} revenue={0} />
                            <GraphCard title={'Total User'} size={getNumberUsers()} revenue={0} />
                        </div>
                        {
                            chartData.length > 0 ? <LineChartComp data={chartData} /> : <></>
                        }
                    </div>
                    <div className="chart-container grid grid-cols-1 col-start-10 col-end-13 sm:col-span-12 md:col-span-12 lg:col-start-1 lg:col-end-13">
                        <BookingChartComp booking={booking} />
                        {
                            chartData.length > 0 ? <DoughnutChartComp data={chartData} /> : <></>
                        }
                    </div>
                </div>
                <RequestTable numberPostPerPage={10} />
            </div>
        </div>
    )
}