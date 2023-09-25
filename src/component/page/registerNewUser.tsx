import {useContext} from "react";
import {UIActionContext} from "../../setup/context/context.ts";

import {UserDetail} from "../form/user-detail.tsx";
import {UserAuth} from "../form/user-auth.tsx";
import {Alert} from "../reusable/alert.tsx";
import {useAppDispatch, useAppSelector} from "../../setup/redux/reduxHook.ts";
import {formAction} from "../../setup/redux/form.ts";


export const RegisterNewUser = () => {
    const ctx = useContext(UIActionContext)
    const dispatch = useAppDispatch()
    const {message, error: {errors}} = useAppSelector((state) => state.form)

    const reSetFormMessage = () => {
        dispatch(formAction.setMessage(""))
    }

    return (
        <>
            {
                (message || errors) && message !== "" || Object.keys(errors).length > 0  ?
                    <Alert
                        function={reSetFormMessage}
                        message={message}
                        error={`${errors && errors.status === 'UNPROCESSABLE_ENTITY'  ? 'Unprocessable Entity. Check all field' : ''}`}
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