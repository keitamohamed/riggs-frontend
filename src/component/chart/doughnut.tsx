import {useEffect, useState} from "react";
import {Doughnut} from "react-chartjs-2";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js/auto";
import {} from 'chart.js'
import {TrafficData} from "../../interface/interface-type.ts";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
);

ChartJS.defaults.borderColor = '#F1F6F9'
ChartJS.defaults.color = '#F1F6F9'

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            text: 'DATA',
            display: true,
            xLabels: 0,
            yLabels: 0,
            alignment: 'center',
            padding: 15,
            font: {
                size: 18
            }
        },
    },
}

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
export const DoughnutChartComp = (props: DataFormatPass) => {

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
        <div className='chart-context doughnut grid gap-[2em]'>
            <Doughnut data={userData} options={options} />
        </div>
    )
}