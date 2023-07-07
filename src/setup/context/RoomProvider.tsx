import {Props} from "../../interface/interface.ts";
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

    const getShowDetail = () => {
        if (roomDetail.id != 0 && roomDetail.showRoomDetail) {
            return true;
        }
        return false
    }

    return (
        <Provider value={{
            setShowDetail,
            getShowDetail
        }}>
            {children}
        </Provider>
    )
}