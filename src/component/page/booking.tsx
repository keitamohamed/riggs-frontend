import {useContext, useEffect} from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import DatePicker from 'react-datepicker'

import {TransparentHeader} from "../reusable/header-trans.tsx";
import {Rooms} from "./rooms.tsx";
import {useRoom} from "../../custom-hook/useRoom.ts";
import {UIActionContext} from "../../setup/context/context.ts";
import {useBooking} from "../../custom-hook/useBooking.ts";
import {useAppSelector} from "../../setup/redux/reduxHook.ts";

export const Booking = () => {
    const uiCtx = useContext(UIActionContext)
    const {booking} = useAppSelector((state) => state.booking)
    const {onChangeRoom, onChange, dateRange, setDateRange} = useBooking()
    const {loadRoom} = useRoom()
    const [startDate, endDate] = dateRange

    useEffect(() => {
        onChange()
        loadRoom()
            .then()
            .catch()
    }, [dateRange])

    return (
        <div className='booking'>
            <TransparentHeader custClass={''}/>
            {
                uiCtx.getShowRooms() ? (
                    <div className="room-available sm:!pl-0 sm:!pr-0">
                        <div className="room-container">
                            <Rooms/>
                        </div>
                    </div>
                ) : <div className="context-container sm:mt-12">
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
                                    <h1>{booking.arrDate?.getDate()}</h1>
                                    <p className='month-name'>{booking.arrDate.toLocaleString('en-us', { month: "long"})}</p>
                                </div>
                                <div className="end-date">
                                    <h1>{booking.depDate?.getDate()}</h1>
                                    <p className='month-name'>{booking.depDate?.toLocaleString('en-us', { month: "long"})}</p>
                                </div>
                            </div>
                            <div className="drop-down-menu">
                                <div className="left-container sm:w-full">
                                    <div className="drop-down grid grid-cols-1">
                                        <div className="room-container grid grid-cols-1">
                                            <select
                                                data-selected={1}
                                                name="numRoom"
                                                id="room"
                                                onChange={onChangeRoom}>
                                                <option selected value={1}>1 Room</option>
                                                <option value={2}>2 Room</option>
                                                <option value={3}>3 Room</option>
                                                <option value={4}>4 Room</option>
                                                <option value={5}>5 Room</option>
                                            </select>
                                        </div>
                                        <div className="room-container grid grid-cols-1">
                                            <select
                                                name="numAdult"
                                                id="adult"
                                                onChange={onChangeRoom}>
                                                <option selected={true} value={1}>1 Adult</option>
                                                <option value={2}>2 Adults</option>
                                                <option value={3}>3 Adults</option>
                                                <option value={4}>4 Adults</option>
                                                <option value={5}>5 Adults</option>
                                            </select>
                                        </div>
                                        <div className="room-container grid grid-cols-1">
                                            <select
                                                name="numChildren"
                                                id="adult"
                                                onChange={onChangeRoom}>
                                                <option selected={true} value={0}>0 Children</option>
                                                <option value={1}>1 Children</option>
                                                <option value={2}>2 Children</option>
                                                <option value={3}>3 Children</option>
                                                <option value={4}>4 Children</option>
                                                <option value={5}>5 Children</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="action-container">
                                        <div className="check-available">
                                        <span onClick={() => uiCtx.setShowRooms(true)}>
                                            Check Available
                                        </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}