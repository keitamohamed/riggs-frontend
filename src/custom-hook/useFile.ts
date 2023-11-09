import {useContext, useEffect, useState} from "react";
import {FileType} from "../interface-type/interface-type.ts";
import {POST_REQUEST} from "../api-endpoint/Request.ts";
import {APIPath, ContextType} from "../api-endpoint/url-context-type.ts";
import {AuthContext} from "../setup/context/context.ts";
import {useAppDispatch} from "../setup/redux/reduxHook.ts";
import {roomAction} from "../setup/redux/room.ts";

export const useFile = () => {
    const authCtx = useContext(AuthContext)
    const dispatch = useAppDispatch()
    const [files, setFiles] = useState<FileType>({
        file: [],
        url: []
    })
    const [drag] = useState<string[]>(['dragleave', 'dragend'])

    const saveFile = (inputElement: any) => {
      if (inputElement?.files.length) {
          for (let i = 0; i < inputElement.files.length; i++) {
              const newFile = inputElement.files[i]
              const {file} = files
              file.push(newFile)
          }
          previewFile()
      }
    }

    const previewFile = () => {
        const imageContainer = document.querySelector(".file-preview") as HTMLFormElement;
        if (imageContainer !== null && files.file.length > 0) {
            imageContainer.style.visibility = "visible"
        }

        files.file.map((file) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            const div = document.createElement("div")
            div.classList.add("content_image");
            const img = document.createElement("img")
            img.classList.add("imageFile")
            const {url} = files
            let isFileExist = false;
            fileReader.onload = () => {
                url.map(img => {
                    if (fileReader.result === img) {
                        isFileExist = true
                    }
                })
                if (!isFileExist) {
                    url.push(fileReader.result)
                    img.src = `${fileReader.result}`
                    div.append(img)
                    imageContainer?.append(div)
                }
            }
        })
    }

    const dropZone = () => {
        const elements: NodeListOf<HTMLElement> = document.querySelectorAll(".file-drop-zone-input");
        elements?.forEach(inputElement => {
            const dropZoneElement = inputElement.closest('.drop-zone');
            const pElement = document.querySelector(".drop-zone p")

            dropZoneElement?.addEventListener('click', () => {
                inputElement.click()
            })

            dropZoneElement?.addEventListener('change', () => {
                saveFile(inputElement)
            })

            dropZoneElement?.addEventListener("dragover", (event) => {
                event.preventDefault()
                dropZoneElement.classList.add("drop_zone__over")
                if (pElement !== null) {
                    pElement.innerHTML = `Release to Upload File's`
                }
            })

            drag.forEach((type: string) => {
                dropZoneElement?.addEventListener(type, () => {
                    dropZoneElement.classList.remove('drop_zone__over')
                    if (type === 'dragleave' && pElement !== null) {
                        pElement.innerHTML = `Drag & drop file here or click to upload`
                    }
                })
            })

            dropZoneElement?.addEventListener('drop', event => {
                event.preventDefault()
                dropZoneElement.classList.remove('drop_zone__over')
                if (pElement !== null) {
                    pElement.innerHTML = `Drag & drop file here or click to upload`
                }
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                saveFile(event.dataTransfer)
            })
        })
    }

    const reSetFile = () => {
        setFiles({
            file: [],
            url: []
        })
    }

    const setMessage = (message: any) => {
        dispatch(roomAction.setMessage(message))
    }

    const setError = (error: any) => {
        dispatch(roomAction.setError(error))
    }

    const uploadFile = (id: number, actionType: string) => {
        const element = document.querySelector(".file_send_error") as HTMLElement
        if (id === 0 && element !== null) {
            element.style.display = 'block'
            return
        }
        if (files.file.length === 0) {
            return;
        }
        files.file.map(async file => {
            const formData = new FormData()
            formData.append('file', file)
            if (actionType === "New") {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                dispatch(POST_REQUEST(authCtx.getCookie().aToken, APIPath.ROOM_FILE(153211), formData, setMessage, setError, ContextType.FILE))
            }
        })
        reSetFile()
    }


    useEffect(() => {
        dropZone()
    }, [])

    return {uploadFile}
}