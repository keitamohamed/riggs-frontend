
import {useAppSelector} from "../../setup/redux/reduxHook.ts";
import {BarChartComp} from "../chart/line.tsx";
import {DoughnutChartComp} from "../chart/doughnut.tsx";
import {RequestTable} from "../table/request-table.tsx";
import {bookingData} from "../../api-endpoint/fake-booking-data.ts";

import {GraphCard} from "./graph-card.tsx";
import pImgae from '../../assets/img/profile-img.jpg'

export const Dash = () => {
    const {rooms} = useAppSelector((state) => state.room)
    const {
        exchange200,
        exchange404,
        exchange400,
        exchange500,
        chartData
    } = useAppSelector((state) => state.app)


    return (
        <div className='dashboard'>
            <div className="dash-nav-bar">

            </div>
            <div className="dashboard-main">
                <div className="graph-card-container grid grid-cols-8">
                    <div className="top-deals-container col-span-2 bg-[#2a3447]">
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
                    <div className="card-main-container col-start-3 col-end-9">
                        <div className="card-container grid grid-cols-4 gap-[1em] w-[90%] m-auto sm:w-full sm:grid-cols-1">
                            <GraphCard title={'Total Rooms'} room={rooms} revenue={0} />
                            <GraphCard title={'Total User'} room={rooms} revenue={0} />
                            {/*<Card title={'Response'} responseCode={200} numRequest={exchange200} date={'2012/09/17'}/>*/}
                            {/*<Card title={'Response'} responseCode={404} numRequest={exchange404} date={'2012/09/17'}/>*/}
                            {/*<Card title={'Response'} responseCode={400} numRequest={exchange400} date={'2012/09/17'}/>*/}
                            {/*<Card title={'Response'} responseCode={500} numRequest={exchange500} date={'2012/09/17'}/>*/}
                        </div>
                        <div className="chart-container grid grid-cols-2">
                            {
                                chartData.length > 0 ? <BarChartComp data={chartData} /> : <></>
                            }
                            {
                                chartData.length > 0 ? <DoughnutChartComp data={chartData} /> : <></>
                            }
                        </div>
                    </div>
                </div>
                <RequestTable numberPostPerPage={10} />
            </div>
        </div>
    )
}