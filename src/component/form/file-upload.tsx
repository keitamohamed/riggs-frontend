import {AiOutlineCloudUpload} from "react-icons/ai";
import {useAppSelector} from "../../setup/redux/reduxHook.ts";

export const FileUpload = () => {
    const {message} = useAppSelector((state) => state.room)
    const {message: msg} = useAppSelector((state) => state.form)

    return (
        <div className='file-upload-container'>
            <div className="message-container">
                {
                    message.message ? <p>{message.message}</p> : <p>New user id is 5625411</p>
                }
            </div>
            <div className="file-preview sm:!grid-cols-1 sm:!w-full sm:!auto-rows-auto"></div>
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