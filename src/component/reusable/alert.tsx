import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../setup/redux/reduxHook.ts";
import {bookingAction} from "../../setup/redux/booking.ts";

type props = {
    message: string
    error: string
}
export const Alert = (prop: props) => {
    const dispatch = useAppDispatch()
    const {message, error} = useAppSelector((state) => state.booking)


    const closeAlert = () => {
        const alert = document.querySelector('.alert-box') as HTMLElement
        alert.classList.remove('alert-message', 'alert-error')
        dispatch(bookingAction.setMessage({}))
        dispatch(bookingAction.setError({}))
    }

    const openAlert = () => {
        const alert = document.querySelector('.alert-box') as HTMLElement
        alert.classList.add('alert-message')
        dispatch(bookingAction.setMessage({}))
        dispatch(bookingAction.setError({}))
    }



    useEffect(() => {
        const el = document.querySelector('.alert-box') as HTMLElement
        if (Object.keys(message).length > 0) {
            el.classList.add('alert-message')
        }
        if (Object.keys(error).length > 0) {
            el.classList.add('alert-error')
        }

        if (Object.keys(message).length > 0 || Object.keys(error).length > 0) {
            setInterval(closeAlert, 10000)
        }

        setInterval(openAlert, 5000)
    }, [message, error])

    return (
        <div className={`alert-box`}>
            {
                Object.keys(message).length > 0 ? <p>{prop.message}</p> : <p>{prop.error}</p>
            }
        </div>
    )
}