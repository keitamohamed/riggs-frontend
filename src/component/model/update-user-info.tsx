import {useContext, useEffect} from "react";
import {UIActionContext} from "../../setup/context/context.ts";
import {UserAuth} from "../form/user-auth.tsx";
import {UserDetail} from "../form/user-detail.tsx";
import {Alert} from "../reusable/alert.tsx";
import {useAppDispatch, useAppSelector} from "../../setup/redux/reduxHook.ts";
import {bookingAction} from "../../setup/redux/booking.ts";
import {formAction} from "../../setup/redux/form.ts";

export const UpdateUserInfo = () => {
    const dispatch = useAppDispatch()
    const ctx = useContext(UIActionContext)
    const {message, error} = useAppSelector((state) => state.form)

    const reSetMessageNError = () => {
        dispatch(formAction.reSetMessage())
        dispatch(formAction.reSetError())
    }

    useEffect(() => {
        console.log(message , ' and error ', Object.keys(error || {}).length )
    }, [message, error])

    return (
        <>
            {
                Object.keys(message).length !== 0 ||  Object.keys(error).length !== 0  ?
                    <Alert
                        function={reSetMessageNError}
                        message={message.message}
                        error={`${error && error.status === 'UNPROCESSABLE_ENTITY'  ? 'Unprocessable Entity. Check all field' : ''}`}
                    /> : <></>
            }
            <div className="signup_container">
                <div className="signup_container">
                    {
                        ctx.getShowAuth() ? <UserAuth type={'Update'} /> : <UserDetail type={'Update'}/>
                    }
                </div>
            </div>
        </>
    )
}