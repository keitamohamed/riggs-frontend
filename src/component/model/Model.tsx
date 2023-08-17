import {UpdateUserInfo} from "./update-user-info.tsx";
import {AiOutlineClose} from "react-icons/ai";
import {useAppDispatch} from "../../setup/redux/reduxHook.ts";
import {userAction} from "../../setup/redux/user.tsx";
import {useContext, useEffect} from "react";
import {UIActionContext} from "../../setup/context/context.ts";
import {formAction} from "../../setup/redux/form.ts";

type props = {show: string}
export const Model = ({show}: props) => {
    const uiCtx = useContext(UIActionContext)
    const dispatch = useAppDispatch()

    const closeModel = () => {
        const el = document.querySelector('.model') as HTMLElement
        if (el) {
            el.classList.remove('model-open')
            el.classList.add('model-close')
        }
        uiCtx.setShowAuth(false)
        dispatch(formAction.reSetForm())
    }
    return (
        <div className='model'>
            <div className="model-context-container">
                <div className="action-btn">
                    <li onClick={closeModel}><AiOutlineClose/></li>
                </div>
                {
                    show == 'user-update' ? <UpdateUserInfo/> : ''
                }
            </div>
        </div>
    )
}