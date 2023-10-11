import {Exchange} from "../../interface/interface-type.ts";
import {BiShow} from "react-icons/bi";

type DataSet = {
    currentPost: Exchange[]
}
export const TableData = (props: DataSet) => {

    const isURLMatch = (str: string) => {
        const arr = [
            'http://localhost:8080/riggs/user',
            'http://localhost:8080/riggs/room',
            'http://localhost:8080/riggs/booking',
            'http://localhost:8080/riggs/admin'
        ]
        return arr.filter(e => str.includes(e))[0]
    }

    const getURLReplaceValue = (str: string) => {
        return isURLMatch(str).includes('/user') ? '/user' : isURLMatch(str).includes('/booking') ? '/booking' : isURLMatch(str).includes('/room') ? '/room' : ''
    }
    const getDate = (str: string) => {
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

    return (
        <table className='request-table table-auto w-full'>
            <thead>
            <tr className='sm:table-auto'>
                {/*<th>Method</th>*/}
                <th>Status</th>
                <th>URI</th>
                <th>TimeStamp</th>
            </tr>
            </thead>
            <tbody>
            {
                props.currentPost.map((data, index) => {

                    return (
                        <tr key={data + '' + index}>
                            {/*<td>{data.request.method}</td>*/}
                            <td className={`${data.response.status === 200 ? 'text-[#03C988]' 
                                : data.response.status === 404 ? 'text-[#337CCF]' 
                                : data.response.status === 400 ? 'text-[#FD8D14]' 
                                : 'text-[#FE0000]' }`}>{data.response.status}</td>
                            <td>{data.request.uri.replace(isURLMatch(data.request.uri), getURLReplaceValue(data.request.uri))}</td>
                            <td>{getDate(data.timestamp)}</td>
                            {/*<td><BiShow/></td>*/}
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}