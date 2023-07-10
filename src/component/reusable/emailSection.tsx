
export const EmailSection = () => {
    return (
        <div className='new-letter'>
            <div className="text-container">
                <h2 className='sm:text-left sm:pl-5 sm:text-3xl !important'>Newsletter</h2>
                <div className="email-container grid sm:grid-cols-1 gap-4 sm:gap-8 grid-cols-12">
                    <input className='col-start-1 col-end-3 sm:col-start-1 sm:col-end-10' type="text" placeholder='First name'/>
                    <input className='col-start-3 col-end-5 sm:col-start-1 sm:col-end-10' type="text" placeholder='Last name'/>
                    <input className='col-start-5 col-end-11 sm:col-start-1 sm:col-end-10' type="email" placeholder='Email address'/>
                    <div className="btn-container col-start-11 col-end-13 sm:col-start-1 sm:col-end-5 sm:mt-8">
                        <p>Submit</p>
                    </div>
                </div>
            </div>
        </div>
    )
}