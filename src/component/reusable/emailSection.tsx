
export const EmailSection = () => {

    return (
        <div className='new-letter'>
            <div className="text-container">
                <h2 className='sm:text-left sm:pl-5 sm:text-3xl !important'>Newsletter</h2>
                <div className="email-container grid w-[70%] sm:w-full gap-4 m-auto sm:!p-[10px]">
                    <div className="grid grid-cols-1 gap-[1em] sm:w-full">
                        <input className='w-full' type="text" placeholder='First name'/>
                        <input className='w-full' type="text" placeholder='Last name'/>
                    </div>
                    <input className='w-full mt-[1em]' type="email" placeholder='Email address'/>
                    <textarea className='w-full mt-[1em]' placeholder='Write message'/>
                    <div className="btn-container">
                        <p>Email</p>
                    </div>
                </div>
            </div>
        </div>
    )
}