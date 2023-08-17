import {useEffect, useState} from "react";

type props = {
    message: string
    error: string
    function: () => void
}
export const Alert = (prop: props) => {
    const [alertOpen, setAlertOpen] = useState<boolean>(false)


    const closeAlert = (element: HTMLElement) => {
        if (element &&
            (element.classList.contains('alert-message') || element.classList.contains('alert-error'))) {
            element.classList.remove('alert-message', 'alert-error')
            element.classList.add('alert-close')
            prop.function()
        }
    }

    const openAlert = (alert: HTMLElement, className: string) => {
        alert.classList.add(`${className}`)
        setAlertOpen(true)
    }

    useEffect(() => {
        const el = document.querySelector('.alert-box') as HTMLElement
        if (Object.keys(prop.message).length > 0) {
            openAlert(el, 'alert-message')
            setInterval(function () {
                closeAlert(el)
            },10000)
            el.classList.remove('alert-close')
        }
        if (Object.keys(prop.error).length > 0) {
            openAlert(el, 'alert-error')
            setInterval(function () {
                closeAlert(el)
            },10000)
            el.classList.remove('alert-close')
        }

    }, [alertOpen])

    return (
        <div className={`alert-box`}>
                <p>{prop.message}</p>
            </div>
    )
}