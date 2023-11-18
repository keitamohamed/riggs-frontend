import {Exchange} from "../../type-dt/type-dt.ts";

type DataSet = {
    currentPost: Exchange[]
}
export const TableData = (props: DataSet) => {

    return (
        <table className='request-table table-auto w-full'>
            <thead>
            <tr className='sm:table-auto'>
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
                            <td className={`${data.response.status === 200 ? 'text-[#03C988]' 
                                : data.response.status === 404 ? 'text-[#337CCF]' 
                                : data.response.status === 400 ? 'text-[#FD8D14]' 
                                : 'text-[#FE0000]' }`}>{data.response.status}</td>
                            <td>{data.request.uri}</td>
                            <td>{data.timestamp}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}