import {Card} from "./card.tsx";
import {useAppSelector} from "../../setup/redux/reduxHook.ts";
import {BarChartComp} from "./chartjs.tsx";
import {DoughnutChartComp} from "../chart/doughnut.tsx";

export const Dash = () => {
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
                <div className="card-container grid grid-cols-4 gap-[1em] w-[90%] m-auto sm:w-full sm:grid-cols-1">
                    <Card title={'Response'} responseCode={200} numRequest={exchange200} date={'2012/09/17'}/>
                    <Card title={'Response'} responseCode={404} numRequest={exchange404} date={'2012/09/17'}/>
                    <Card title={'Response'} responseCode={400} numRequest={exchange400} date={'2012/09/17'}/>
                    <Card title={'Response'} responseCode={500} numRequest={exchange500} date={'2012/09/17'}/>
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
    )
}