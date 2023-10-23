
export const EmailSection = () => {

    return (
        <div className='new-letter'>
            <div className="text-container">
                <h2 className='sm:text-left sm:pl-5 sm:text-3xl !important'>Newsletter</h2>
                <div className="email-container grid w-[70%] gap-4 m-auto">
                    <div className="container grid gap-[1em]">
                        <input className='col-start-1 col-end-3 sm:col-start-1 sm:col-end-10' type="text" placeholder='First name'/>
                        <input className='col-start-3 col-end-5 sm:col-start-1 sm:col-end-10' type="text" placeholder='Last name'/>
                    </div>
                    <input className='w-full mt-[1em]' type="email" placeholder='Email address'/>
                    <textarea className='w-full' placeholder='Write message'/>
                    <div className="btn-container">
                        <p>Submit</p>
                    </div>
                </div>
            </div>
        </div>
    )
}