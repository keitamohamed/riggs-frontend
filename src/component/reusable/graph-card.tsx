import {SiMicrosoftexcel} from 'react-icons/si'
import {useUser} from "../../custom-hook/useUser.ts";

type Data = {
    title: string,
    size: number
    revenue: number
}
export const GraphCard = (props: Data) => {
    const {onClickGenerateUserExcelFile} = useUser()

    return (
        <div className={`card card-graph`}>
            <div className="card-header">
                <h5 className={''}>{props.title}</h5>
            </div>
            <div className="card-context flex">
                <div className="updated flex">
                    <h1 className=''>{props.size}</h1>
                </div>
                <div className="view-info flex">
                    <span>View</span>
                    <h4>{`78%`}</h4>
                </div>
                <div className="btn-container grid place-content-end !text-right">
                    {
                        props.title == 'Users Data' ? <li className='flex list-none w-fit gap-[1em] !text-right ml-auto'
                                                          onClick={onClickGenerateUserExcelFile}
                        >
                            <SiMicrosoftexcel className='!w-fit'/> Excel</li> : <></>
                    }

                </div>
            </div>
        </div>
    )
}