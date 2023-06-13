import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

import {useAppDispatch} from "../setup/redux/reduxHook.ts";
import {authAction} from "../setup/redux/authenticate.ts";

import {Credentials, LoginCredential, LoginError} from "../interface/interface.ts";
import {POST_AUTHENTICATE_REQUEST} from "../api-endpoint/Request.ts";
import {APIPath} from "../api-endpoint/urlPath.ts";
import {userAction} from "../setup/redux/user.tsx";

export const useLogin = () => {
    const nav = useNavigate()
    const dispatch = useAppDispatch()
    const [loginCred, setLoginCred] = useState<LoginCredential>()
    const [error, setLoginError] = useState<LoginError>()

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setLoginCred(
            {
                ...loginCred,
                [name]: value
            }
        )
    }

    const setCredential = (data: Credentials) => {
        if (data.code === "406" || data.code === "400") {
            setError(data)
        } else {
            dispatch(authAction.setCredentials(data))
            dispatch(authAction.setCookie(data))
            nav("/profile")
        }
    }
    const onSubmit =  async (e: any) => {
        e.preventDefault();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await dispatch(POST_AUTHENTICATE_REQUEST(APIPath.LOGIN, loginCred, setCredential, setError))
    }
    const setError = (error: LoginError) => {
        const {email, password, message} = error;
        setLoginError({
            ...error,
            email,
            password,
            message
        })
    }
    const setMessage = async (response: any) => {
        dispatch(userAction.setMessage(response))
    }

    return {onChange, onSubmit, error}
}