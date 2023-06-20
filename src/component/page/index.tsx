import {Rooms} from "./rooms.tsx";
import {useRoom} from "../../custom-hook/useRoom.ts";
import {useEffect} from "react";
export const Index = () => {
    const {loadRoom} = useRoom()

    useEffect(() => {
        loadRoom().then(r => r)
    }, [])
    return (
        <div className="index">
            <Rooms/>
        </div>
    )
}