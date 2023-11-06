import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../setup/redux/reduxHook.ts";
import {roomAction} from "../../setup/redux/room.ts";

export const AlertRegisterRoom = () => {
    const dispatch = useAppDispatch()
    const {message} = useAppSelector((state) => state.room)
    const [alertOpen, setAlertOpen] = useState<boolean>(false)


    const closeAlert = (element: HTMLElement) => {
        if (element &&
            (element.classList.contains('alert-message') || element.classList.contains('alert-error'))) {
            element.classList.remove('alert-message', 'alert-error')
            element.classList.add('alert-close')
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            dispatch(roomAction.reSetMessage())
        }
    }

    const openAlert = (alert: HTMLElement, className: string) => {
        alert.classList.add(`${className}`)
        setAlertOpen(true)
    }

    useEffect(() => {
        const el = document.querySelector('.alert-box') as HTMLElement
        if (message?.message !== "") {
            openAlert(el, 'alert-message')
            setInterval(function () {
                closeAlert(el)
            },10000)
            el.classList.remove('alert-close')
        }

    }, [message])

    return (
        <div className={`alert-box w-full`}>
            <p className='text-center'>{message.message}</p>
        </div>
    )
}