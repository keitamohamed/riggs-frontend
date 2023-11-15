import axios from "axios";
import FileSaver from 'file-saver'
import {LoginCredential} from "../interface-type/interface-type.ts";


export const POST_AUTHENTICATE_REQUEST = (
    url: string,
    data: LoginCredential,
    action: (error: object) => void,
    setError: (error: object) => void) => {

    return async () => {
        const send = async () => {
            return axios({
                method: 'POST',
                url: `riggs${url}`,
                data: data,
                withCredentials: true,
                headers: {
                    Authorization: 'Bearer',
                    'Content-Type': 'application/json'
                }
            })
        }
        try {
            const response = await send();
            action(response.data)
        } catch (error) {
            setError(error.response?.data)
        }
    }
}

export const POST_REQUEST = (
    token: string,
    url: string,
    data: object,
    action: (response: object) => void,
    setError: (error: object) => void,
    contextType: string
    ) => {
    return async () => {
        const send = async () => {
            return axios({
                method: 'POST',
                url: `riggs/${url}`,
                data: data,
                headers: {
                    Authorization: token ? `Bearer ${token}` : 'Bearer',
                    'Content-Type': contextType
                }
            });
        }

        try {
            const response = await send()
            action(response.data)
        }catch (error) {
            setError(error.response?.data)
        }
    }
}

export const GET_REQUEST = (
    token: string,
    url: string,
    action: (data: object) => void,
    setError: (error: any) => void,
    appInfo: boolean
) => {
    return async () => {
        const fetch = async () => {
            return axios({
                method: "GET",
                url: `riggs/${appInfo ? 'admin/' + url : url}`,
                withCredentials: true,
                headers: {
                    Authorization: token ? `Bearer ${token}` : 'Bearer',
                    'Content-Type': 'application/json'
                }
            })
        }

        try {
            const response = await fetch();
            action(response.data)
        } catch (error) {
            setError(error.response)
        }
    }
}

export const DOWNLOAD_IMAGE_FILE = (
    token: string,
    url: string,
) => {
    return axios({
        method: "GET",
        url: `riggs/${url}`,
        withCredentials: true,
        headers: {
            Authorization: token ? `Bearer ${token}` : 'Bearer',
        }
    })

}

export const DOWNLOAD_EXCEL_FILE = (
    token: string,
    url: string,
    fileName: string,
    action: (data: object) => void,
    setError: (error: any) => void,
    appInfo: boolean
) => {
    return async () => {
        const fetch = async () => {
            return axios({
                method: "GET",
                url: `riggs/${appInfo ? 'admin/' + url : url}`,
                withCredentials: true,
                headers: {
                    Authorization: token ? `Bearer ${token}` : 'Bearer',
                    'Content-Type': 'application/file'
                },
                responseType: 'blob'
            })
        }

        try {
            // const response = await fetch();
            await fetch()
                .then((response) => {
                    const blob = new Blob([response.data],
                            {type: "'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'"});
                    FileSaver.saveAs(blob, `${'Riggs_User_Data_For_' + getCurrentDate() + '.xlsx'}`)
                })
        } catch (error) {
            setError(error.response)
        }
    }
}

export const PUT_REQUEST = (
    token: string,
    url: string,
    data: object,
    action: (response: object) => void,
    setError: (error: object) => void) => {

    return async () => {
        const send = async () => {
            return axios({
                method: "PUT",
                url: `riggs/${url}`,
                data: data,
                headers: {
                    Authorization: token ? `Bearer ${token}` : 'Bearer',
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            })
        }
        try {
            const response = await send();
            action(response.data)
        } catch (error) {
            setError(error.response.data)
        }
    }
}

export const DELETE_REQUEST = (
    token: string,
    url: string,
    deleteAction: (data: object) => void,
    setError: (error: any) => void,
) => {

    return async () => {
        const sendRequest = async () => {
            return axios({
                method: "DELETE",
                url: `riggs/${url}`,
                withCredentials: true,
                headers: {
                    Authorization: token ? `Bearer ${token}` : 'Bearer',
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            })
        }

        try {
            const response = await sendRequest();
            deleteAction(response.data)
        } catch (error) {
            setError(error.response.data)
        }
    }
}

const getCurrentDate = () : string => {
    const date = new Date();
    return `${date.toLocaleDateString('en-us', {month: 'long'}) + '/' + date.getUTCDay() + '/' + date.getUTCFullYear()}`
}