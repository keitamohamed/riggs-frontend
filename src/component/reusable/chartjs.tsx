import {useEffect, useState} from "react";
import {Line} from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    Tooltip,
} from 'chart.js/auto'
import {TrafficData} from "../../interface/interface.ts";


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

ChartJS.register(
    CategoryScale,
    Tooltip,
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            text: 'TRAFFIC DATA',
            display: true,
            padding: 15,
            font: {
                size: 18
            }
        },
    },
}

export const BarChartComp = (props: DataFormatPass) => {
    const [userData, setUserData] = useState<DataFormat>({
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
        setUserData({
            ...userData,
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
            <Line data={userData} options={options} />
        </div>
    )
}

