import {useEffect, useState} from "react";
import {Line} from 'react-chartjs-2'

import {
    Chart as ChartJS,
    CategoryScale,
    Tooltip,
} from 'chart.js/auto'
import {BookingData, ChartMonthlyProgress} from "../../type-dt/type-dt.ts";
import {useGraphData} from "../../type-dt/useGraphData.ts";

type DataFormat = {
    labels: string[],
    datasets: [
        {
            data: number[],
            borderColor: string,
            backgroundColor: string
        }
    ]
}

type MonthlyProgress = {
    booking: ChartMonthlyProgress[]
}

ChartJS.defaults.borderColor = '#BAD7E9'
ChartJS.defaults.color = '#F1F6F9'

ChartJS.register(
    CategoryScale,
    Tooltip,
);

const options = {
    responsive: true,
    scales: {
        x: {
            grid: {
                display: false,
            }
        },
        y: {
            beginAtZero: true,
            grid: {
                display: false,
            },
            ticks: {
                callback: function(value: number) {
                    return '$' + value;
                }
            }
        },
    },
    plugins: {
        legend: {
            display: false,
        }
    },
}

export const BookingChartComp = (props: MonthlyProgress) => {
    const {getMonth} = useGraphData()

    const [trafficDate, setTrafficDate] = useState<DataFormat>({
        labels: props.booking.map((data) => data.month),
        datasets: [
            {
                data: props.booking.map((data) => data.amount),
                borderColor: '#FE0000',
                backgroundColor: '#F1F6F9'
            }
        ]
    })

    useEffect(() => {
        setTrafficDate({
            ...trafficDate,
            datasets: [
                {
                    data: props.booking.map((data) => data.amount),
                    borderColor: '#FE0000',
                    backgroundColor: '#F1F6F9'
                }
            ]
        })
    }, [props.booking])


    return (
        <div className='chart-context !h-full booking-graph grid w-full'>
            {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <Line data={trafficDate} options={options} />
            }
        </div>
    )
}

