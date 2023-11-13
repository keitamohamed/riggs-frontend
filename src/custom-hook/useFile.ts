import {useContext, useState} from "react";
import {POST_REQUEST} from "../api-endpoint/Request.ts";
import {APIPath, ContextType} from "../api-endpoint/url-context-type.ts";
import {AuthContext} from "../setup/context/context.ts";
import {useAppDispatch, useAppSelector} from "../setup/redux/reduxHook.ts";
import {roomAction} from "../setup/redux/room.ts";
import {formAction} from "../setup/redux/form.ts";
import {FileType} from "../interface-type/interface-type.ts";

export const useFile = () => {
    const authCtx = useContext(AuthContext)
    const {file, url} = useAppSelector((state) => state.form.imgFile)
    const dispatch = useAppDispatch()
    const [files] = useState<FileType>({
        file: [],
        url: []
    })

    const [drag] = useState<string[]>(['dragleave', 'dragend'])

    const saveFile = (inputElement: any) => {
      if (inputElement?.files.length) {
          for (let i = 0; i < inputElement.files.length; i++) {
              dispatch(formAction.addFile(inputElement.files[i]))
              files.file.push(inputElement.files[i])
          }
      }
    }

    const previewFile = () => {
        const imageContainer = document.querySelector(".file-preview") as HTMLFormElement;
        if (imageContainer !== null && file.length > 0) {
            imageContainer.style.visibility = "visible"
        }
        file.map((imgFile) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(imgFile)
            const div = document.createElement("div")
            div.classList.add("content_image");
            const img = document.createElement("img")
            img.classList.add("imageFile")
            let isFileExist = false;
            fileReader.onload = () => {
                url.map(img => {
                    if (fileReader.result == img) {
                        isFileExist = true
                    }
                })
                if (!isFileExist) {
                    dispatch(formAction.addUrl(fileReader.result))
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
        if (file.length == 0) {
            return;
        }
        file.map(async file => {
            const formData = new FormData()
            formData.append('file', file)
            if (actionType == "New") {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                await dispatch(POST_REQUEST(authCtx.getCookie().aToken, APIPath.ROOM_IMAGE_SAVE(id), formData, setMessage, setError, ContextType.FILE))

            }
        })
        dispatch(formAction.reSetFile())
    }

    return {uploadFile, dropZone, previewFile}
}