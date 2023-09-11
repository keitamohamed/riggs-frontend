import React, {ChangeEvent, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";

import {useAppDispatch} from "../setup/redux/reduxHook.ts";
import {authAction} from "../setup/redux/authenticate.ts";

import {Credentials, LoginCredential, LoginError} from "../interface/interface.ts";
import {POST_AUTHENTICATE_REQUEST} from "../api-endpoint/Request.ts";
import {APIPath} from "../api-endpoint/urlPath.ts";
import {AuthContext} from "../setup/context/context.ts";

export const useLogin = () => {
    const authCtx = useContext(AuthContext)
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

    const setCredential = (credentials: Credentials) => {
        if (credentials.code === "401" || credentials.code === "400") {
            setError(credentials)
        } else {
            authCtx.setCredentials(credentials)
            dispatch(authAction.setCredentials(credentials))
            dispatch(authAction.setCookie(credentials))
            nav("/")
        }
    }
    const onSubmit =  async (e: React.SyntheticEvent) => {
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

    return {onChange, onSubmit, error}
}