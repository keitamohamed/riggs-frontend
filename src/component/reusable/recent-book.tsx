import {useAppSelector} from "../../setup/redux/reduxHook.ts";

export const RecentBook = () => {
    const {recentBook} = useAppSelector((state) => state.booking)

    const getSumTotal = (total: number) => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        })
       return formatter.format(total)
    }

    return (
        <>
            <div className="top-deals-container col-span-3 sm:col-span-12 md:col-span-12 lg:col-span-5 bg-[#2a3447]">
                <div className="most-recent-booking">
                    <div className="title-container">
                        <h1>Recent Booking</h1>
                    </div>
                    <div className={`context-container ${recentBook.length == 0 ? 'relative h-[45dvh]' : ''}`}>
                        {
                            recentBook.length > 0 ? recentBook.map((book, index) => {
                                return (
                                    <div className="book-container flex gap-[.5em]" key={index}>
                                        <div className="avatar flex gap-[.7em]" key={`${book.id}_${index}`}>
                                            <img className='w-10 h-10 rounded-full' src={'/profile-img.jpg'} alt=""/>
                                            <div className="avatar-context grid grid-cols-1">
                                                <h5>{book.name}</h5>
                                                <p className='!w-[50%]'>{book.email}</p>
                                            </div>
                                        </div>
                                        <div className="booking-id-price-container flex flex-col">
                                            <p className='grid justify-end place-content-end'># {book.id}</p>
                                            <p className='grid justify-end place-content-end'>{getSumTotal(book.total)}</p>
                                        </div>
                                    </div>
                                )
                            }) : <div className='no-booking absolute inset-0 h-4 mx-auto my-auto'>No Booking Made</div>
                        }
                    </div>
                </div>
            </div>

        </>
    )
}