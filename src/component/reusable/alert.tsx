import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../setup/redux/reduxHook.ts";
import {bookingAction} from "../../setup/redux/booking.ts";

type props = {
    message: string
    error: string
}
export const Alert = (prop: props) => {
    const dispatch = useAppDispatch()
    const {message, error} = useAppSelector((state) => state.booking)
    const [alertOpen, setAlertOpen] = useState<boolean>(false)


    const closeAlert = (element: HTMLElement) => {
        if (element &&
            (element.classList.contains('alert-message') || element.classList.contains('alert-error'))) {
            element.classList.remove('alert-message', 'alert-error')
            element.classList.add('alert-close')
            dispatch(bookingAction.setMessage({}))
            dispatch(bookingAction.setError({}))
        }
    }

    const openAlert = (alert: HTMLElement, className: string) => {
        alert.classList.add(`${className}`)
        setAlertOpen(true)
    }

    useEffect(() => {
        const el = document.querySelector('.alert-box') as HTMLElement
        if (Object.keys(message).length > 0) {
            openAlert(el, 'alert-message')
            setInterval(function () {
                closeAlert(el)
            },10000)
            el.classList.remove('alert-close')
        }
        if (Object.keys(error).length > 0) {
            openAlert(el, 'alert-error')
            setInterval(function () {
                closeAlert(el)
            },10000)
            el.classList.remove('alert-close')
        }

    }, [message, error, alertOpen])

    return (
        <div className={`alert-box`}>
            {
                Object.keys(message).length > 0 ? <p>{prop.message}</p> : <p>{prop.error}</p>
            }
        </div>
    )
}