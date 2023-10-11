import {createSlice} from "@reduxjs/toolkit";

import {InitAppSys} from "../../interface/interface-type.ts";


const formatTimeStamp = (str: string) => {
    const split = str.split("-")
    const date = new Date(split[1] + "/" + split[2].substring(0, 2) + "/" + split[0])
    const strTime = split[2].substring(3, 11).split(":")
    date.setHours(+strTime[0]-4)
    date.setMinutes(+strTime[1])
    date.setSeconds(+strTime[2])
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour:'2-digit',
        minute:'2-digit',
        hour12: true
    }).format(date)
}

const initialState: InitAppSys = {
    exchange200: 0,
    exchange400: 0,
    exchange404: 0,
    exchange500: 0,
    traces: [],
    exchanges: [],
    chartData: [],
    database: {components: undefined, status: ""},
    error: undefined,
    message: undefined
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setDatabaseHealth(state, action) {
            state.database = action.payload
        },
        setExchange(state, action) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            action.payload?.exchanges.map((e): any => {
                state.exchanges.push({
                    timestamp:  formatTimeStamp(e?.timestamp),
                    request: {
                        uri: e?.request.uri,
                        method: e?.request.method
                    },
                    response: {
                        status: e?.response.status
                    },
                    timeTaken: e?.timeTaken
                })
            })

            state.exchange200 = action.payload?.exchanges.filter((e: any) => e.response.status == 200).length
            state.exchange400 = action.payload?.exchanges.filter((e: any) => e.response.status == 400).length
            state.exchange404 = action.payload?.exchanges.filter((e: any) => e.response.status == 404).length
            state.exchange500 = action.payload?.exchanges.filter((e: any) => e.response.status == 500).length
        },
        setTraces(state, action) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            state.traces = action.payload?.exchanges.filter((data: any) =>
                data.request.uri !== 'http://localhost:8080/riggs/admin/httpexchanges' &&
                data.request.uri !== 'http://localhost:8080/riggs/admin/health')
        },
        setChartData(state, action) {
            let numTime = action.payload?.exchanges.filter((e: any) => e.response.status == 200).length
            state.chartData.push({
                code: 200,
                recurrent: numTime
            })
            numTime = action.payload?.exchanges.filter((e: any) => e.response.status == 400).length
            state.chartData.push({
                code: 400,
                recurrent: numTime
            })
            numTime = action.payload?.exchanges.filter((e: any) => e.response.status == 404).length
            state.chartData.push({
                code: 404,
                recurrent: numTime
            })
            numTime = action.payload?.exchanges.filter((e: any) => e.response.status == 500).length
            state.chartData.push({
                code: 500,
                recurrent: numTime
            })
        },
        resetChartData(state) {
            state.chartData = []
        } ,
        setMessage(state, action) {
            state.message = action.payload
        },
        setError(state, action) {
            state.error = action.payload.error
        }
    }
})

export const appAction = appSlice.actions;
export default appSlice
