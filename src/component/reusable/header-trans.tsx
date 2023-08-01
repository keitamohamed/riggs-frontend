import {useContext} from "react";
import {UIActionContext} from "../../setup/context/context.ts";
import {AiOutlineClose} from "react-icons/ai";
import {useNavigate} from "react-router-dom";

type props = {custClass: string}
export const TransparentHeader = ({custClass}: props) => {
    const nav = useNavigate()
    const uiCtx = useContext(UIActionContext)

    return (
        <div className={`header ${custClass}`}>
            <div className={`title-container ${uiCtx.getShowRooms() ? 'grid grid-cols-6' : ''} md:ml-28 lg:ml-28 xl:ml-28 col-start-2 col-end-8 sm:col-end-9`}>
                <div className={`context ${uiCtx.getShowRooms() ? 'col-start-1 col-end-6 text-transform' : ''}`}>
                    <p>8080 F st nw</p>
                    <h1 onClick={() => nav('/')}>Riggs</h1>
                    <p>Washington d.c</p>
                </div>
                {
                    uiCtx.getShowRooms() ?(
                        <div className="action-container">
                            <AiOutlineClose onClick={() => uiCtx.setShowRooms(false)}/>
                        </div>
                    ) : ''
                }

            </div>
        </div>
    )
}