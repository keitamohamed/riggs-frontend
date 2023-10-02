
type Data = {
    title: string,
    size: number
    revenue: number
}
export const GraphCard = (props: Data) => {

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
            </div>
        </div>
    )
}