import {AiOutlineCloudUpload} from "react-icons/ai";
import {useAppSelector} from "../../setup/redux/reduxHook.ts";
import {DOWNLOAD_IMAGE_FILE} from "../../api-endpoint/Request.ts";
import {APIPath} from "../../api-endpoint/url-context-type.ts";
import {useContext} from "react";
import {AuthContext} from "../../setup/context/context.ts";


export const FileUpload = () => {
    const authCtx = useContext(AuthContext)
    const {room, message} = useAppSelector((state) => state.room)
    const {message: msg} = useAppSelector((state) => state.form)

    const getImage = () => {
        DOWNLOAD_IMAGE_FILE(authCtx.getCookie().aToken, (APIPath.FILE_BASE_DIR + APIPath.ROOM_IMAGE_DOWNLOAD(room.roomID)))
    }


    return (
        <div className='file-upload-container'>
            <div className="message-container">
                {
                    room.roomID ? <p>{`Selected room ID: ${room.roomID}`}</p> : <p>New user id is 5625411</p>
                }
            </div>
            <div className={`file-preview sm:!grid-cols-1 sm:!w-full sm:!auto-rows-auto ${room.image.length > 0 ? '!visible' : ''}`}>
                {
                    room.image.length > 0 ?
                        room.image.map((url) => {

                            return (
                                <div className='image-container'>
                                    <img src={APIPath.FILE_BASE_DIR + APIPath.ROOM_IMAGE_DOWNLOAD(room.roomID)} alt=""/>
                                </div>
                            )
                        }) : <></>
                }
            </div>
            <div className="file-drop-zone">
                <div className="drop-zone">
                    <AiOutlineCloudUpload/>
                    <br/>
                    <p>Drag & Drop image file here or click to upload</p>
                    <input type="file"
                           name='file'
                           className="file-drop-zone-input"
                           multiple={true}
                           accept="image/jpeg, image/jpg, image/png"
                    />
                </div>
            </div>
        </div>
    )
}