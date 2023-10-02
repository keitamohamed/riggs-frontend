import {AiOutlineExport} from 'react-icons/ai'
import {SiMicrosoftexcel} from 'react-icons/si'
import {useAppSelector} from "../../setup/redux/reduxHook.ts";
import {TableData} from "./table-data.tsx";
import {usePaginate, usePost} from "../../custom-hook/usePaginate.ts";
import {Pagination} from "../reusable/Pagination.tsx";

export const RequestTable = (post: {numberPostPerPage: number}) => {
    const {traces} = useAppSelector((state) => state.app)
    const {currentPost, postPerPage, setCurrentPost} = usePaginate(post.numberPostPerPage)
    const {currentPosts} = usePost(traces, currentPost, postPerPage)

    const paginate = (pageNumber: number) => setCurrentPost(pageNumber)

    return (
        <div className='table w-full'>
            <div className="main">
                <div className="table-title-container">
                    <h1>Http Traces <span><SiMicrosoftexcel/> Excel</span></h1>
                </div>
                <div className="context">
                    <div className="trace">
                        {
                            currentPosts.length > 0 ? <TableData currentPost={currentPosts} /> : <></>

                        }
                        <Pagination
                            postPerPage={postPerPage}
                            totalPost={traces.length}
                            paginate={paginate} />
                    </div>


                </div>
            </div>
        </div>
    )
}