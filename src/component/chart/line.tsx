import {useEffect, useState} from "react";
import {Line} from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    Tooltip,
} from 'chart.js/auto'
import {TrafficData} from "../../type-dt/type-dt.ts";


type DataFormat = {
    labels: number[],
    datasets: [
        {
            data: number[],
            borderColor: string,
            backgroundColor: string[]
        }
    ]
}

type DataFormatPass = {
    data: TrafficData[]
}

ChartJS.defaults.borderColor = '#BAD7E9'
ChartJS.defaults.color = '#F1F6F9'

ChartJS.register(
    CategoryScale,
    Tooltip,
);

const options = {
    responsive: true,
    indexAxis: 'y',
    scales: {
        x: {
            beginAtZero: true,
            grid: {
                display: false,
            }
        },
    },
    plugins: {
        legend: {
            display: false,
        },
        title: {
            text: 'TRAFFIC DATA RESPONSE CODE',
            display: true,
            padding: 15,
            font: {
                size: 18
            }
        },
    },
}
 
export const LineChartComp = (props: DataFormatPass) => {
    const [trafficDate, setTrafficDate] = useState<DataFormat>({
        labels: props.data.map((data) => data.code),
        datasets: [
            {
                data: props.data.map((data) => data.recurrent),
                borderColor: '#A8B2D1',
                backgroundColor: ['#03C988', '#337CCF', '#FD8D14', '#FE0000']
            }
        ]
    })

    useEffect(() => {
        setTrafficDate({
            ...trafficDate,
            datasets: [
                {
                    data: props.data.map((data) => data.recurrent),
                    borderColor: '#A8B2D1',
                    backgroundColor: ['#03C988', '#337CCF', '#FD8D14', '#FE0000']
                }
            ]
        })
    }, [props.data])


    return (
        <div className='chart-context grid mt-[1em]'>
            {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <Line data={trafficDate} options={options} />
            }
        </div>
    )
}

