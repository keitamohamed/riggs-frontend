
export const Pagination = (props: {totalPost: number, postPerPage: number, paginate: (num: number) => void}) => {

    const pages = []
    for (let i = 1; i <= Math.ceil(props.totalPost / props.postPerPage); i++) {
        pages.push(i)
    }

    const onClick = (pageNumber: number) => {

        const li = document.querySelectorAll(".pageItem")
        li.forEach(e => {
            e.addEventListener('click', () => {
                li.forEach(r =>{
                    r.classList.remove('current')
                })
                if (!e.classList.contains('current')) {
                    e.classList.add('current')
                }
            })
        })

        props.paginate(pageNumber)
    }

    return (
        <div className="paginationWrapper grid justify-content gap-[1em] m-auto mt-3 p-1 rounded-lg">
            {
                pages.map((pageNumber, index) => (
                    <div
                        key={`${pageNumber}_${index}`}
                        className="paginationBtnContainer"
                    >
                        {
                            pageNumber == 1 ? <li
                                className="pageItem btn current"
                                key={pageNumber}
                                onClick={() => onClick(pageNumber)}
                            >
                                {pageNumber}
                            </li> : <li
                                className="pageItem btn"
                                key={pageNumber}
                                onClick={() => onClick(pageNumber)}
                            >
                                {pageNumber}
                            </li>
                        }
                    </div>
                ))
            }
        </div>
    )
}