import {FormEvent, useContext, useEffect, useState} from "react";
import {UIActionContext} from "../../setup/context/context.ts";
import {useAppSelector} from "../../setup/redux/reduxHook.ts";
import {useForm} from "../../custom-hook/useForm.ts";
import {Alert} from "../reusable/alert.tsx";

type props = {
    type: string,
}
export const UserAuth = (prop: props) => {

    const uiCtx = useContext(UIActionContext)
    const {onSubmitAddNewUser, onSubmitSendUpdateAuth, onChangeSetNewUserAuth, onChangeSetUpdateAuth} = useForm()
    const {userForm, userForm: {auth}, message, error} = useAppSelector((state) => state.form)
    const {user} = useAppSelector((state) => state.user)

    const [conformPassword, setConformPassword] = useState<string>()
    const [passwordNotMatch, setPasswordNotMatch] = useState<string>()

    const isPasswordMatch =  (): boolean  => {
        if ((conformPassword) && conformPassword !== userForm.auth.password) {
            setPasswordNotMatch('Password do not match')
        } else {
            setPasswordNotMatch('')
            return true
        }
        return false;
    }

    const onChange = (event: any) => {
        setConformPassword(event.target.value)
    }

    const onSubmitSendAuthUpdate = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (isPasswordMatch()) {
            onSubmitSendUpdateAuth()
        }
    }

    return (
        <>
            <div className="content sm:!w-[90%]">
                <div className="title-container sm:!w-[100%]">
                    {
                        prop.type == 'New' ? (
                            <div className="title-container sm:!w-[100%]">
                                <h1>Sign up</h1>
                                <p>It's quick and easy.</p>
                            </div>
                        ) :
                            <>
                                <h1>Update</h1>
                                <p>{`User ${uiCtx.getShowAuth() ? 'authentication update' : 'information update.'}`}</p>
                            </>
                    }
                </div>
                <form onSubmit={prop.type == 'Update' ? onSubmitSendAuthUpdate : onSubmitAddNewUser}
                      className={`form sm:!w-[100%] block}`}>
                    <div className="form-group">
                        <input type="email"
                               name="email"
                               className={auth?.email ? 'invalid-input' : ''}
                               autoComplete="off"
                               onChange={prop.type == 'New' ? onChangeSetNewUserAuth : onChangeSetUpdateAuth}
                               placeholder={auth?.email ? auth?.email : 'Enter email'}
                        />
                    </div>
                    {
                        user.auth.role === 'Admin'.toUpperCase() ? (
                            <div className="form-group">
                                <input type="text"
                                       name="role"
                                       className={auth?.role ? 'invalid-input' : ''}
                                       autoComplete="off"
                                       onChange={prop.type == 'New' ? onChangeSetNewUserAuth : onChangeSetUpdateAuth}
                                       placeholder={auth?.role ? auth?.role : 'Enter role (ex: Admin or User)'}
                                />
                            </div>
                        ) : <></>
                    }
                    <div className="form-group">
                        <input type="password"
                               name="password"
                               className={auth?.password ? 'invalid-input' : ''}
                               autoComplete="off"
                               onChange={prop.type == 'New' ? onChangeSetNewUserAuth : onChangeSetUpdateAuth}
                               placeholder={auth?.password ? auth?.password : 'Enter password'}
                        />
                    </div>
                    <div className="form-group">
                        <input type="password"
                               name="conform-password"
                               onChange={onChange}
                               autoComplete="off"
                               placeholder={"Conform password"}
                        />
                    </div>
                    <div className="form-group message">
                        {passwordNotMatch ? <p className="message">{passwordNotMatch}</p> : <></>}
                    </div>
                    <div className="form-group message">
                        {message !== null ? <p className="message">{message?.message}</p> : <></>}
                    </div>
                    <div className="form_group next">
                        <input type="submit" value={prop.type == 'Update' ? prop.type : 'Submit'}/>
                    </div>
                </form>
            </div>
        </>
    )
}