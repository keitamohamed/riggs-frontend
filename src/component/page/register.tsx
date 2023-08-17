import {useContext} from "react";
import {UIActionContext} from "../../setup/context/context.ts";

import {UserDetail} from "../form/user-detail.tsx";
import {UserAuth} from "../form/user-auth.tsx";
import {Alert} from "../reusable/alert.tsx";
import {useAppDispatch, useAppSelector} from "../../setup/redux/reduxHook.ts";
import {formAction} from "../../setup/redux/form.ts";


export const Register = () => {
    const ctx = useContext(UIActionContext)
    const dispatch = useAppDispatch()
    const {message, error} = useAppSelector((state) => state.form)

    const reSetMessageNError = () => {
        dispatch(formAction.setMessage({}))
        dispatch(formAction.setError({}))
    }


    return (
        <>
            {
                (message || error) && Object.keys(message).length > 0 || Object.keys(error).length > 0  ?
                    <Alert
                        function={reSetMessageNError}
                        message={message.message}
                        error={`${error && error.status === 'UNPROCESSABLE_ENTITY'  ? 'Unprocessable Entity. Check all field' : ''}`}
                    /> : <></>
            }
            <div className="signup_container">
                {
                    ctx.getShowAuth() ? <UserAuth type={'New'} /> : <UserDetail type={'New'}/>
                }
            </div>
        </>
    )
  
}