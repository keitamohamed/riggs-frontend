import {formAction} from "../setup/redux/form.ts";
import {useAppDispatch, useAppSelector} from "../setup/redux/reduxHook.ts";
import {POST_REQUEST, PUT_REQUEST} from "../api-endpoint/Request.ts";
import {APIPath} from "../api-endpoint/urlPath.ts";
import {useContext} from "react";
import {AuthContext, UIActionContext} from "../setup/context/context.ts";
import {useUser} from "./useUser.ts";

export const useForm = () => {
    const ctx = useContext(UIActionContext)
    const authCtx = useContext(AuthContext)

    const dispatch = useAppDispatch()
    const {userForm} = useAppSelector((state) => state.form)
    const {findUserByEmail} = useUser()


    const onChangeSetNewUser = (event: any) => {
        dispatch(formAction.setNewUserInput(event.target))
    }
    const onChangeSetNewUserAddress = (event: any) => {
        dispatch(formAction.setNewUserAddress(event.target))
    }
    const onChangeSetNewUserAuth = (event: any) => {
        dispatch(formAction.setUserAuth(event.target))
    }
    const onChangeSetUpdate = (event: any) => {
        dispatch(formAction.setUpdate(event.target))
    }
    const onChangeSetUpdateAddress = (event: any) => {
        dispatch(formAction.setUpdateAddress(event.target))
    }
    const onChangeSetUpdateAuth = (event: any) => {
        dispatch(formAction.setUpdateAuth(event.target))
    }

    const setMessage = async (message: object) => {
        dispatch(formAction.setMessage(message))
    }

    const setInvalidInputError = async (response: any) => {
        dispatch(formAction.setError(response))
        const {error: {address, firstName, lastName, phoneNum}} = response
        if (!address && !firstName && !lastName && !phoneNum) {
            if (!ctx.getShowAuth()) {
                dispatch(formAction.reSetError())
            }
            ctx.setShowAuth(true)
        }
    }

    const onSubmitAddNewUser = async (event: any) => {
        event.preventDefault()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await dispatch(POST_REQUEST(null, APIPath.ADD_NEW_USER, userForm, setMessage, setInvalidInputError))
    }
    const onSubmitSendUpdate = async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await dispatch(PUT_REQUEST(authCtx.getCookie().aToken, APIPath.UPDATE_USER_INFO(userForm.userID), userForm, setMessage, setInvalidInputError))
        findUserByEmail(authCtx.getCookie().email)
        dispatch(formAction.reSetForm())
    }

    const onSubmitSendUpdateAuth = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(PUT_REQUEST(authCtx.getCookie().aToken, APIPath.UPDATE_USER_AUTH(update.auth.authID), userForm.auth, setMessage, setInvalidInputError))
        findUserByEmail(authCtx.getCookie().email)
        dispatch(formAction.reSetForm())
    }

    return {
        onChangeSetNewUser,
        onChangeSetNewUserAddress,
        onChangeSetNewUserAuth,
        onChangeSetUpdate,
        onChangeSetUpdateAddress,
        onChangeSetUpdateAuth,
        onSubmitAddNewUser,
        onSubmitSendUpdate,
        onSubmitSendUpdateAuth
    }


}