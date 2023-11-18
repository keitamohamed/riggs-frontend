
import {useAppSelector} from "../../setup/redux/reduxHook.ts";
import {LineChartComp} from "../chart/line.tsx";
import {DoughnutChartComp} from "../chart/doughnut.tsx";
import {RequestTable} from "../table/request-table.tsx";

import {GraphCard} from "./graph-card.tsx";
import {useApp} from "../../custom-hook/useApp.ts";
import {BookingChartComp} from "../chart/booking-graph.tsx";
import {BookingData} from "../../type-dt/type-dt.ts";
import {RecentBook} from "./recent-book.tsx";

export const Dash = () => {
    const {getNumberOfRoom, getNumberUsers} = useApp()
    const {rooms} = useAppSelector((state) => state.room)
    const {
        monthlyProgress,
        chartData
    } = useAppSelector((state) => state.app)


    return (
        <div className='dashboard px-[1em]'>
            <div className="dashboard-main">
                <div className="graph-card-container grid grid-cols-9 gap-[1em] sm:p-[10px] md:p-[10px] lg:p-[10px]">
                    <RecentBook/>
                    <div className="card-main-container grid grid-cols-1 col-start-5 col-end-10 sm:col-span-12 md:col-span-12 lg:col-start-6 lg:col-end-13">
                        <div className="card-container grid grid-cols-2 gap-[.5em] md:grid-cols-2 m-auto w-full">
                            <GraphCard title={'Total Rooms'} size={getNumberOfRoom()} revenue={0} />
                            <GraphCard title={'Users Data'} size={getNumberUsers()} revenue={0} />
                        </div>
                        {
                            chartData.length > 0 ? <LineChartComp data={chartData} /> : <></>
                        }
                    </div>
                    <div className="chart-container grid grid-cols-1 col-start-1 col-end-10 sm:col-span-12 md:col-span-12 lg:col-start-1 lg:col-end-13">
                        <BookingChartComp booking={monthlyProgress} />
                        {
                            chartData.length > 0 ? <DoughnutChartComp data={chartData} /> : <></>
                        }
                    </div>
                </div>
                .
                <RequestTable numberPostPerPage={10} />
            </div>
        </div>
    )
}