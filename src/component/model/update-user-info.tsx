import {useAppSelector} from "../../setup/redux/reduxHook.ts";
import {useContext} from "react";
import {UIActionContext} from "../../setup/context/context.ts";
import {useUser} from "../../custom-hook/useUser.ts";

export const UpdateUserInfo = () => {
    const ctx = useContext(UIActionContext)
    const {user, message, error, error: {address, auth}} = useAppSelector((state) => state.user)
    const {onChangeSetUpdate, onChangeSetUpdateAddress, onChangeSetUpdateAuth, onSubmitSendUpdate} = useUser()

    return (
        <>
            <div className="signup_container">
                <div className="content sm:!w-[90%]">
                    <div className="title-container sm:!w-[100%]">
                        <h1>Update</h1>
                        <p>{`User ${ctx.getShowAuth() ? 'authentication update' : 'information update.'}`}</p>
                    </div>
                    <div className={`form sm:!w-[100%] ${ctx.getShowAuth() ? 'hidden' : 'block'}`}>
                        <div className="form-group">
                            <input type="text"
                                   className={error.firstName ? 'invalid-input' : ''}
                                   name="firstName"
                                   autoComplete="off"
                                   onChange={onChangeSetUpdate}
                                   placeholder={error.firstName ? error.firstName : `Enter first name ( ${user.firstName} )`}
                            />
                        </div>
                        <div className="form-group">
                            <input type="text"
                                   name="lastName"
                                   className={error.lastName ? 'invalid-input' : ''}
                                   autoComplete="off"
                                   onChange={onChangeSetUpdate}
                                   placeholder={error.lastName ? error.lastName : `Enter last name ( ${user.lastName} )`}
                            />
                        </div>
                        <div className="form-group">
                            <input type="text"
                                   name="phoneNum"
                                   className={error.phoneNum ? 'invalid-input' : ''}
                                   onChange={onChangeSetUpdate}
                                   autoComplete="off"
                                   placeholder={error.phoneNum ? error.phoneNum : `Enter phone number ( ${user.phoneNum} )`}
                            />
                        </div>
                        <div className="form-group">
                            <input type="text"
                                   name="street"
                                   className={address?.street ? 'invalid-input' : ''}
                                   onChange={onChangeSetUpdateAddress}
                                   autoComplete="off"
                                   placeholder={address?.street ? address?.street : `Enter street address ( ${user.address.street} )`}
                            />
                        </div>
                        <div className="form-group">
                            <input type="text"
                                   name="city"
                                   className={address?.city ? 'invalid-input' : ''}
                                   onChange={onChangeSetUpdateAddress}
                                   autoComplete="off"
                                   placeholder={address?.city ? address?.city : `Enter city ( current: ${user.address.city} )`}
                            />
                        </div>
                        <div className="form-group">
                            <input type="text"
                                   name="state"
                                   className={address?.state ? 'invalid-input' : ''}
                                   onChange={onChangeSetUpdateAddress}
                                   autoComplete="off"
                                   placeholder={address?.state ? address?.state : `Enter state ( ${user.address.state} )`}
                            />
                        </div>
                        <div className="form-group">
                            <input type="text"
                                   className={address?.zipcode ? 'invalid-input' : ''}
                                   name="zipcode"
                                   onChange={onChangeSetUpdateAddress}
                                   autoComplete="off"
                                   placeholder={address?.zipcode ? address?.zipcode : `Enter zipcode ( ${user.address.zipcode} )`}
                            />
                        </div>
                        <div className="form-group message">
                            {message !== null ? <p className="message">{message?.message}</p> : <p className="message">Information have been updated</p>}
                        </div>
                        <div className="form_group next">
                            <p className='sm:block hidden' onClick={onSubmitSendUpdate}>Update</p>
                            <p className=''>
                                <span onClick={() => ctx.setShowAuth(true)}>Edit Authenticate</span>
                            </p>
                        </div>
                    </div>
                    <form onSubmit={() => null}
                          className={`form sm:!w-[100%] ${ctx.getShowAuth() ? 'block' : 'hidden'}`}>
                        <div className="form-group">
                            <input type="email"
                                   name="email"
                                   className={auth?.email ? 'invalid-input' : ''}
                                   autoComplete="off"
                                   onChange={onChangeSetUpdateAuth}
                                   placeholder={auth?.email ? auth?.email : 'Enter email'}
                            />
                        </div>
                        {
                            user.auth.role === 'Admin'.toUpperCase() ? (
                                <div className="form-group">
                                    <input type="text"
                                           name="role"
                                           className={auth?.role ? 'invalid-input' : ''}
                                           autoComplete="off"
                                           onChange={onChangeSetUpdateAuth}
                                           placeholder={auth?.role ? auth?.role : 'Enter role (ex: Admin or User)'}
                                    />
                                </div>
                            ) : <></>
                        }
                        <div className="form-group">
                            <input type="password"
                                   name="password"
                                   className={auth?.password ? 'invalid-input' : ''}
                                   autoComplete="off"
                                   onChange={onChangeSetUpdateAuth}
                                   placeholder={auth?.password ? auth?.password : 'Enter password'}
                            />
                        </div>
                        <div className="form-group">
                            <input type="password"
                                   name="conform-password"
                                   onChange={() => null}
                                   autoComplete="off"
                                   placeholder={"Conform password"}
                            />
                        </div>
                        <div className="form-group message">
                            {message !== null ? <p className="message">{message?.message}</p> : <p className="message">Information have been updated</p>}
                        </div>
                        <div className="form_group next">
                            <input type="submit" value="Update"/>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}