import {Props} from "../../interface/interface-type.ts";
import {RoomActionContext} from "./context.ts";
import {useState} from "react";

const {Provider} = RoomActionContext
export const RoomContextProvider = ({children}: Props) => {

    const [roomDetail, setRoomDetail] = useState({
        id: 0,
        showRoomDetail: false
    })

    const setShowDetail = (id: number, value: boolean) => {
        setRoomDetail({
            ...roomDetail,
            id: id,
            showRoomDetail: value
        })
    }

    const showDetail = () => {
        if (roomDetail.showRoomDetail && roomDetail.id !== 0)
            return roomDetail.id
        return 0
    }

    return (
        <Provider value={{
            setShowDetail,
            showDetail
        }}>
            {children}
        </Provider>
    )
}