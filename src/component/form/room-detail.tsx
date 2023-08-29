import {useAppDispatch, useAppSelector} from "../../setup/redux/reduxHook.ts";
import {roomAction} from "../../setup/redux/room.ts";
import {useRoom} from "../../custom-hook/useRoom.ts";

type props = {
    title: string
    btn: string,
}

export const Room_Form = (prop: props) => {
    const dispatch = useAppDispatch()
    const {rooms, room} = useAppSelector((state) => state.room)
    const {onSubmit} = useRoom()

    const onChange = (event: any) => {
        dispatch(roomAction.newRoom(event.target))
    }

    const onChangeSetRoomDetail = (event: any) => {
        dispatch(roomAction.setRoomDetail(event.target))
    }

    return (
        <>
            <div className="content">
                <form
                    onSubmit={onSubmit}
                    action=""
                    className="form !w-[60%] sm:!w-[100%] block">
                    <div className="form-group">
                        <input type="text" name='roomName' onChange={onChange} placeholder={`Name`}/>
                    </div>
                    <div className="form-group">
                        <input type="text" name='description' onChange={onChange} placeholder={`Description`}/>
                    </div>
                    <div className="form-group">
                        <input type="text" name='bed' onChange={onChangeSetRoomDetail} placeholder={`Bed type`}/>
                    </div>
                    <div className="form-group">
                        <input type="text" name='view' onChange={onChangeSetRoomDetail} placeholder={`View type`}/>
                    </div>
                    <div className="form-group">
                        <input type="text" name='numberOfBed' onChange={onChangeSetRoomDetail} placeholder={`Number of bed`}/>
                    </div>
                    <div className="form-group">
                        <input type="text" name='bathroom' onChange={onChangeSetRoomDetail} placeholder={`Bathroom description`}/>
                    </div>
                    <div className="form-group">
                        <select
                            data-selected={1}
                            name="smoking"
                            onChange={onChangeSetRoomDetail}
                            id="smoking">
                            <option value='Pet friendly amenities'>Smoking not allow</option>
                            <option value='Animal not allow'>Smoking allow</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <select
                            data-selected={2}
                            name="animal"
                            onChange={onChangeSetRoomDetail}
                            id="room">
                            <option value='Animal not allow'>Animal not allow</option>
                            <option value='Pet friendly amenities'>Pet friendly Amenities</option>
                        </select>
                    </div>
                    <div className="form_group btn">
                        <input type="submit" value={prop.btn == 'Update' ? prop.btn : 'Submit'}/>
                    </div>
                </form>
            </div>
        </>
    )
}