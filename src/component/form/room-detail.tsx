import {useAppDispatch, useAppSelector} from "../../setup/redux/reduxHook.ts";
import {roomAction} from "../../setup/redux/room.ts";
import {useRoom} from "../../custom-hook/useRoom.ts";
import {useContext, useState} from "react";
import {DashboardContext} from "../../setup/context/context.ts";
import {FileUpload} from "./file-upload.tsx";
import {useFile} from "../../custom-hook/useFile.ts";

type props = {
    title: string
    btn: string,
}

export const Room_Form = (prop: props) => {
    const dashCtx = useContext(DashboardContext)
    const dispatch = useAppDispatch()
    const {room, message, error: {map}} = useAppSelector((state) => state.room)
    const {onSubmit} = useRoom()
    const {uploadFile} = useFile()
    const [show, setShow] = useState<boolean>(false)

    const [roomName] = useState<string[]>([
        'Superior King',
        'Superior Double',
        'Deluxe King',
        'Deluxe Double',
        'Atelier Suite',
        'Gallery Suite',
        'IDA Mckinley Suite',
        'Caroline Harrison Suite',
        'Louisa Adams Suite',
        'Angelica Van Buren Suite'
    ])

    const onChange = (event: any) => {
        dispatch(roomAction.newRoom(event.target))
    }

    const onChangeSetRoomDetail = (event: any) => {
        dispatch(roomAction.setRoomDetail(event.target))
    }

    const onChangeSetRoomName = (event: any) => {
        dispatch(roomAction.setRoomName(event.target))
    }

    const onSubmitForm = (event: any) => {
      onSubmit(event)
          .then(() => {
              setShow(true)
          })
    }

    const setAction = async () => {
        await uploadFile(message.id, 'New')
        setShow(false)
    }

    return (
        <>
            <div className="content">
                {
                    !show ? (
                        <form
                            onSubmit={onSubmitForm}
                            action=""
                            className="form !w-[60%] sm:!w-[90%] block">
                            <div className="form-group">
                                <select
                                    data-selected={2}
                                    name="roomName"
                                    className={map.error?.roomName ? 'invalid-input' : ''}
                                    onChange={onChangeSetRoomName}
                                    id="name">
                                    <option value={'roomName'}>
                                        {map.error?.roomName ? map.error.roomName : room.roomName ? `Name (prev: ${room.roomName})` : 'Select room name'}</option>
                                    {
                                        roomName.map((name) => {
                                            return <option value={name}>{name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <input type="text" name='description' className={map.error?.description ? 'invalid-input' : ''}
                                       onChange={onChange} placeholder={map.error?.description ? map?.error.description : room.description ? `Description (prev: ${room.description})` : 'Description'}/>
                            </div>
                            <div className="form-group">
                                <input type="text" name='size' className={map.error?.size ? 'invalid-input' : ''}
                                       onChange={onChange} placeholder={map.error?.size ? map?.error.size : room.size ? `Size (prev: ${room.size})` : 'Room size'}/>
                            </div>
                            <div className="form-group">
                                <input type="number" name='price' className={map.error?.price ? 'invalid-input' : ''}
                                       onChange={onChange} placeholder={map.error?.price ? map?.error.price : room.price ? `Price (prev: ${room.price})` : 'Room price'}/>
                            </div>
                            <div className="form-group">
                                <input type="text" name='bed' className={map.error?.detail.bed ? 'invalid-input' : ''}
                                       onChange={onChangeSetRoomDetail} placeholder={map.error?.detail.bed ? map.error.detail.bed : room.detail.bed ? `Bed (prev: ${room.detail.bed})` : 'Bed type'}/>
                            </div>
                            <div className="form-group">
                                <input type="text" name='view' className={map.error?.detail.view ? 'invalid-input' : ''}
                                       onChange={onChangeSetRoomDetail} placeholder={map.error?.detail.view ? map.error.detail.view : room.detail.view ? `View (prev: ${room.detail.view})` : 'View view'}/>
                            </div>
                            <div className="form-group">
                                <input type="text" name='numberOfBed' className={map.error?.detail.numberOfBed ? 'invalid-input' : ''}
                                       onChange={onChangeSetRoomDetail} placeholder={map.error?.detail.numberOfBed ? map.error.detail.numberOfBed : room.detail.numberOfBed ? `Number of bed (prev: ${room.detail.numberOfBed})` : `Number of bed`}/>
                            </div>
                            <div className="form-group">
                                <input type="text" name='bathroom' className={map.error?.detail.bathroom ? 'invalid-input' : ''}
                                       onChange={onChangeSetRoomDetail} placeholder={map.error?.detail.bathroom  ? map.error.detail.bathroom : room.detail.bathroom ? `Bathroom desc (prev: ${room.detail.bathroom})` : 'Bathroom description'}/>
                            </div>
                            <div className="form-group">
                                <select
                                    data-selected={1}
                                    name="tv"
                                    onChange={onChangeSetRoomDetail}
                                    className={map.error?.detail.tv ? 'invalid-input' : ''}
                                    id="tv">
                                    <option value={'invalid-value'}>
                                        {map.error?.detail.tv ? map.error.detail.tv : 'Is there tv'}
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
                                    <option value='Smoking not allow'>Smoking not allow</option>
                                    <option value='Smoking allow'>Smoking allow</option>
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
                                <input className={`sm:!w-full`} type="submit" value={prop.btn == 'Update' ? prop.btn :
                                    dashCtx.getFormType().actionType == 'Update' ? 'Updated' : 'Submit'}/>
                            </div>
                        </form>
                    ) :
                        (
                            <div className="file-upload">
                                <FileUpload/>
                                <div className="btn-container w-[85%] m-auto">
                                    <p className="btn-upload-file"
                                       onClick={setAction}
                                    >
                                        upload File
                                    </p>
                                </div>
                            </div>
                    )
                }
            </div>
        </>
    )
}