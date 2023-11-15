import {useContext} from "react";
import {AuthContext, DashboardContext, UIActionContext} from "../../setup/context/context.ts";

import {UserDetail} from "../form/user-detail.tsx";
import {UserAuth} from "../form/user-auth.tsx";
import {Alert} from "../reusable/alert.tsx";
import {useAppDispatch, useAppSelector} from "../../setup/redux/reduxHook.ts";
import {formAction} from "../../setup/redux/form.ts";
import {useNavigate} from "react-router-dom";


export const RegisterNewUser = () => {
    const nav = useNavigate()
    const authCtx = useContext(AuthContext)
    const dashCtx = useContext(DashboardContext)
    const ctx = useContext(UIActionContext)
    const dispatch = useAppDispatch()
    const {message, error} = useAppSelector((state) => state.form)

    const reSetFormMessage = () => {
        dispatch(formAction.setMessage(""))
        authCtx.isAuthenticated() && authCtx.isAdmin() ? dashCtx.setDisplayComponentType("dashboard-one")
            : nav("/login")
    }

    return (
        <>
            {
                (message || error) && (message.message !== "" || error.message !== "") ?
                    <Alert
                        function={reSetFormMessage}
                        message={message}
                        error={error.message}
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