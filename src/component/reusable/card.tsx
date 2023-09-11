import {AiOutlineCheckCircle} from 'react-icons/ai'

type Data = {
    title: string,
    responseCode: number,
    numRequest: number,
    date: string
}
export const Card = (props: Data) => {
    const getDate = (date: string) => {
        const setDate = new Date(date)
        return `${setDate.getUTCMonth() + '/' + setDate.getUTCDay() + '/' + setDate.getUTCFullYear()}`
    }
    
    const getTime = () => {
      return (new Date().toLocaleTimeString())
    }
    return (
        <div className={`card ${props.responseCode == 200 ? 'bg-[#03C988]' : ''}`}>
            <div className="card-header">
                {
                    props.responseCode == 200 ? <AiOutlineCheckCircle className='' /> : <></>
                }
                <h5 className={''}>{`${props.responseCode + ' ' + props.title}`}</h5>
                <h1 className=''>{props.numRequest}</h1>
            </div>
            <div className="card-context flex">
                <span>Updated:</span>
                <h4>{getDate(props.date)},</h4>
                <h4>{getTime()}</h4>
            </div>
            <div className="card-footer">
            </div>
        </div>
    )
}