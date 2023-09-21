import {useAppDispatch, useAppSelector} from "../../setup/redux/reduxHook.ts";
import {roomAction} from "../../setup/redux/room.ts";
import {useRoom} from "../../custom-hook/useRoom.ts";

type props = {
    title: string
    btn: string,
}

export const Room_Form = (prop: props) => {
    const dispatch = useAppDispatch()
    const {rooms, room, error: {map}} = useAppSelector((state) => state.room)
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
                    className="form !w-[60%] sm:!w-[90%] block">
                    <div className="form-group">
                        <input  type="text" name='roomName' className={map.error?.roomName ? 'invalid-input' : ''}
                                onChange={onChange} placeholder={map.error?.roomName ? map.error.roomName : 'Name'}/>
                    </div>
                    <div className="form-group">
                        <input type="text" name='description' className={map.error?.description ? 'invalid-input' : ''}
                               onChange={onChange} placeholder={map.error?.description ? map?.error.description : 'Description'}/>
                    </div>
                    <div className="form-group">
                        <input type="text" name='size' className={map.error?.size ? 'invalid-input' : ''}
                               onChange={onChange} placeholder={map.error?.size ? map?.error.size : 'Room size'}/>
                    </div>
                    <div className="form-group">
                        <input type="text" name='bed' className={map.error?.detail.bed ? 'invalid-input' : ''}
                               onChange={onChangeSetRoomDetail} placeholder={map.error?.detail.bed ? map.error.detail.bed : 'Bed type'}/>
                    </div>
                    <div className="form-group">
                        <input type="text" name='view' className={map.error?.detail.view ? 'invalid-input' : ''}
                               onChange={onChangeSetRoomDetail} placeholder={map.error?.detail.view ? map.error.detail.view : 'View type'}/>
                    </div>
                    <div className="form-group">
                        <input type="text" name='numberOfBed' className={map.error?.description ? 'invalid-input' : ''}
                               onChange={onChangeSetRoomDetail} placeholder={`Number of bed`}/>
                    </div>
                    <div className="form-group">
                        <input type="text" name='bathroom' className={map.error?.detail.bathroom ? 'invalid-input' : ''}
                               onChange={onChangeSetRoomDetail} placeholder={map.error?.detail.bathroom  ? map.error.detail.bathroom : 'Bathroom description'}/>
                    </div>
                    <div className="form-group">
                        <select
                            data-selected={1}
                            name="tv"
                            onChange={onChangeSetRoomDetail}
                            className={map.error?.detail.tv ? 'invalid-input' : ''}
                            id="tv">
                            <option value={'invalid-value'}>
                                {map.error?.detail.tv ? map.error.detail.tv : 'Is smoking allow'}
                            </option>
                            <option value='No tv'>No tv</option>
                            <option value='Yes, tv'>Yes, there is tv</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <select
                            data-selected={1}
                            name="smoking"
                            onChange={onChangeSetRoomDetail}
                            className={map.error?.detail.smoking ? 'invalid-input' : ''}
                            id="smoking">
                            <option value={'invalid-value'}>
                                {map.error?.detail.smoking ? map.error.detail.smoking : 'Is smoking allow'}
                            </option>
                            <option value='Animal not allow'>Smoking not allow</option>
                            <option value='Smoking not allow'>Smoking allow</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <select
                            data-selected={2}
                            name="animal"
                            className={map.error?.detail.animal ? 'invalid-input' : ''}
                            onChange={onChangeSetRoomDetail}
                            id="animal">
                            <option value={'invalid-value'}>
                                {map.error?.detail.animal ? map.error.detail.animal : 'Is animal allow'}</option>
                            <option value='Animal not allow'>Animal not allow</option>
                            <option value='Pet friendly amenities'>Pet friendly Amenities</option>
                        </select>
                    </div>
                    <div className="form_group btn sm:pl-[.6em] sm:pr-[.6em]">
                        <input className={`sm:!w-full`} type="submit" value={prop.btn == 'Update' ? prop.btn : 'Submit'}/>
                    </div>
                </form>
            </div>
        </>
    )
}