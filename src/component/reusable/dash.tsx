import {Card} from "./card.tsx";
export const Dash = () => {

    return (
        <div className='dashboard-main'>
            <div className="card-container grid grid-cols-4">
                <Card title={'Response'} responseCode={200} numRequest={12} date={'2012/09/17'}/>
            </div>
        </div>
    )
}