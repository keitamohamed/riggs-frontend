import {useEffect, useState} from "react";
import DatePicker from 'react-datepicker'
import {useNavigate} from "react-router-dom";
import moment from "moment";

export const Booking = () => {
    const nav = useNavigate()
    const [dateRange, setDateRange] = useState([null, null])
    const [startDate, endDate] = dateRange
    const [date, setDate] = useState({
        startDate: new Date(),
        endDate: new Date()
    })

    const onChangeRoom = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value)
    }

    // const onChange = (dates: any) => {
    //     console.log(dates)
    //     const [start, end] = dates
    //     console.log(start)
    //     // console.log(date.startDate, end)
    //     if (start != null && end != null) {
    //         setDate({
    //             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //             // @ts-ignore
    //             startDate: new Date(moment(start).format("YYYY-MM-DD")),
    //             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //             // @ts-ignore
    //             endDate: new Date(moment(end).format("YYYY-MM-DD"))
    //         })
    //     } else {
    //         setDate({
    //             ...date,
    //             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //             // @ts-ignore
    //             startDate: new Date(moment(start).format("YYYY-MM-DD")),
    //         })
    //     }
    // }

    const onChange = () => {
        const [start, end] = dateRange
        // console.log('DD', st)
        // if (st != null) {
        //     const d = new Date(st).toLocaleDateString()
        //     const dt = new Date(d)
        //     console.log(dt.getDate())
        //     console.log(d)
        // }
        if (start && end) {
            setDate({
                startDate: new Date(start),
                endDate: new Date(end)
            })
        } else if (start){
            setDate({
                ...date,
                startDate: new Date(start)
            })
        }
    }

    useEffect(() => {
        onChange()
    }, [dateRange])

    return (
        <div className='booking'>
            <div className="header">
                <div className="title-container md:ml-28 lg:ml-28 xl:ml-28 col-start-2 col-end-8 sm:col-end-9">
                    <p>8080 F st nw</p>
                    <h1 onClick={() => nav('/')}>Riggs</h1>
                    <p>Washington d.c</p>
                </div>
            </div>
            <div className="context-container sm:mt-12">
                <div className="context grid grid-cols-12 sm:grid-cols-1 gap-2">
                    <div className="date-selector col-start-1 col-end-8 sm:col-span-1">
                        <div className={`select-date-container w-full`}>
                            <div className="text-container">
                                <h5 className="text">Select your dates</h5>
                            </div>
                            <DatePicker
                                selectsRange={true}
                                startDate={startDate}
                                endDate={endDate}
                                onChange={(update: any) => setDateRange(update)}
                                inline
                                monthsShown={2}
                                dateFormat="DD/MM/YYYY"
                            />
                        </div>
                    </div>
                    <div className="booking-info col-start-8 col-end-13 sm:col-span-1">
                        <div className="date-container grid grid-cols-2">
                            <div className="start-date">
                                <h1>{date.startDate?.getDate()}</h1>
                                <p className='month-name'>{date.startDate.toLocaleString('en-us', { month: "long"})}</p>
                            </div>
                            <div className="end-date">
                                <h1>{date.endDate?.getDate()}</h1>
                                <p className='month-name'>{date.endDate?.toLocaleString('en-us', { month: "long"})}</p>
                            </div>
                        </div>
                        <div className="drop-down-menu">
                            <div className="left-container sm:w-full">
                                <div className="drop-down grid grid-cols-1">
                                    <div className="room-container grid grid-cols-1">
                                        <select
                                            name="room"
                                            id="room"
                                            onChange={onChangeRoom}>
                                            <option value="1">1 Room</option>
                                            <option value="2">2 Room</option>
                                            <option value="3">3 Room</option>
                                            <option value="4">4 Room</option>
                                            <option value="5">5 Room</option>
                                        </select>
                                    </div>
                                    <div className="room-container grid grid-cols-1">
                                        <select
                                            name="adult"
                                            id="adult"
                                            onChange={onChangeRoom}>
                                            <option value="1">1 Adult</option>
                                            <option value="2">2 Adults</option>
                                            <option value="3">3 Adults</option>
                                            <option value="4">4 Adults</option>
                                            <option value="5">5 Adults</option>
                                        </select>
                                    </div>
                                    <div className="room-container grid grid-cols-1">
                                        <select
                                            name="adult"
                                            id="adult"
                                            onChange={onChangeRoom}>
                                            <option value="0">0 Children</option>
                                            <option value="1">1 Children</option>
                                            <option value="2">2 Children</option>
                                            <option value="3">3 Children</option>
                                            <option value="4">4 Children</option>
                                            <option value="5">5 Children</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="action-container">
                                    <div className="check-available">
                                        <span>Check Available</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}