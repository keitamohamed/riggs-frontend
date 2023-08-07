import {useContext} from "react";
import {AuthContext, UIActionContext} from "../../setup/context/context.ts";
import {AiOutlineClose} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {authAction} from "../../setup/redux/authenticate.ts";
import {useAppDispatch} from "../../setup/redux/reduxHook.ts";

type props = {custClass: string}
export const TransparentHeader = ({custClass}: props) => {
    const nav = useNavigate()
    const authCtx = useContext(AuthContext)
    const uiCtx = useContext(UIActionContext)
    const dispatch = useAppDispatch()


    const setLogout = () => {
        authCtx.logout()
        dispatch(authAction.setLogout())
        nav('/')
    }

    return (
        <div className={`header ${custClass}`}>
            <div className={`title-container ${uiCtx.getShowRooms() ? 'grid grid-cols-6' : ''} md:ml-28 lg:ml-28 xl:ml-28 col-start-2 col-end-8 sm:col-end-9`}>
                <div className={`context ${uiCtx.getShowRooms() ? 'col-start-1 col-end-6 text-transform' : 'col-start-1 col-end-5 w-full'}`}>
                    <p>8080 F st nw</p>
                    <h1 className='w-full' onClick={() => nav('/')}>Riggs</h1>
                    <p>Washington d.c</p>
                </div>
                {
                    uiCtx.getShowRooms() ? (
                        <div className="action-container">
                            <AiOutlineClose onClick={() => uiCtx.setShowRooms(false)}/>
                        </div>
                    ) : <div className={`col-start-5 col-end-7`}>
                        <div className="book login-signup">
                            <h5 className={``} onClick={setLogout}>Logout</h5>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}