import {useContext, useEffect} from "react";
import {BsArrowRightSquare} from 'react-icons/bs'
import {useUser} from "../../custom-hook/useUser.ts";
import {useAppDispatch, useAppSelector} from "../../setup/redux/reduxHook.ts";
import {UIActionContext} from "../../setup/context/context.ts";
import {userAction} from "../../setup/redux/user.tsx";



export const Register = () => {
    const ctx = useContext(UIActionContext)
    const dispatch = useAppDispatch()
    const {user, error, message, error: {address, auth}} = useAppSelector((state) => state.user)
    const {onChangeSetNewUser, onChangeSetNewUserAddress, onChangeSetNewUserAuth, onSubmitAddNewUser} = useUser()

    const setRole = () => {
      if (user.auth.role == '') {
          dispatch(userAction.setRole({name: 'role', value: 'USER'}))
      }
    }

    const onClickCheckValidation = async (event: any) => {
        if (user.firstName == '' || user.lastName == '' || user.phoneNum == '') {
            await onSubmitAddNewUser(event)
        } else if (user.address.street == '' || user.address.city == '' ||
            user.address.state == '' || user.address.zipcode == '') {
            await onSubmitAddNewUser(event)
        } else {
            dispatch(userAction.reSetError())
            ctx.setShowAuth(true)
            setRole()
        }
    }

    return (
        <>
            <div className="signup_container">
                <div className="content sm:!w-[90%]">
                    <div className="title-container sm:!w-[100%]">
                         <h1>Sign up</h1>
                        <p>It's quick and easy.</p>
                    </div>
                    <div className={`form sm:!w-[100%] ${ctx.getShowAuth() ? 'hidden' : 'block'}`}>
                        <div className="form-group">
                            <input type="text"
                                   className={error.firstName ? 'invalid-input' : ''}
                                   name="firstName"
                                   autoComplete="off"
                                   onChange={onChangeSetNewUser}
                                   placeholder={error.firstName ? error.firstName : 'Enter first name'}
                            />
                        </div>
                        <div className="form-group">
                            <input type="text"
                                   name="lastName"
                                   className={error.lastName ? 'invalid-input' : ''}
                                   autoComplete="off"
                                   onChange={onChangeSetNewUser}
                                   placeholder={error.lastName ? error.lastName : 'Enter last name'}
                            />
                        </div>
                        <div className="form-group">
                            <input type="text"
                                   name="phoneNum"
                                   className={error.phoneNum ? 'invalid-input' : ''}
                                   onChange={onChangeSetNewUser}
                                   autoComplete="off"
                                   placeholder={error.phoneNum ? error.phoneNum : 'Enter phone number'}
                            />
                        </div>
                        <div className="form-group">
                            <input type="text"
                                   name="street"
                                   className={address?.street ? 'invalid-input' : ''}
                                   onChange={onChangeSetNewUserAddress}
                                   autoComplete="off"
                                   placeholder={address?.street ? address?.street : "Enter street address"}
                            />
                        </div>
                        <div className="form-group">
                            <input type="text"
                                   name="city"
                                   className={address?.city ? 'invalid-input' : ''}
                                   onChange={onChangeSetNewUserAddress}
                                   autoComplete="off"
                                   placeholder={address?.city ? address?.city : 'Enter city'}
                            />
                        </div>
                        <div className="form-group">
                            <input type="text"
                                   name="state"
                                   className={address?.state ? 'invalid-input' : ''}
                                   onChange={onChangeSetNewUserAddress}
                                   autoComplete="off"
                                   placeholder={address?.state ? address?.state : 'Enter state'}
                            />
                        </div>
                        <div className="form-group">
                            <input type="text"
                                   className={address?.zipcode ? 'invalid-input' : ''}
                                   name="zipcode"
                                   onChange={onChangeSetNewUserAddress}
                                   autoComplete="off"
                                   placeholder={address?.zipcode ? address?.zipcode : 'Enter zipcode'}
                            />
                        </div>
                        <div className="form_group next">
                            <p className='sm:hidden block' onClick={onClickCheckValidation}>Next</p>
                            <p className='sm:block hidden' onClick={onClickCheckValidation}><BsArrowRightSquare/></p>
                        </div>
                    </div>
                    <form onSubmit={onSubmitAddNewUser}
                          className={`form sm:!w-[100%] ${ctx.getShowAuth() ? 'block' : 'hidden'}`}>
                        <div className="form-group">
                            <input type="email"
                                   name="email"
                                   className={auth?.email ? 'invalid-input' : ''}
                                   autoComplete="off"
                                   onChange={onChangeSetNewUserAuth}
                                   placeholder={auth?.email ? auth?.email : 'Enter email'}
                            />
                        </div>
                        {
                            auth.role == 'ROLE_ADMIN' ? (
                                <div className="form-group">
                                    <input type="text"
                                           name="role"
                                           className={auth?.role ? 'invalid-input' : ''}
                                           autoComplete="off"
                                           onChange={onChangeSetNewUserAuth}
                                           placeholder={auth?.role ? auth?.role : 'Enter role (ex: Admin or User)'}
                                    />
                                </div>
                            ) : ''
                        }
                        <div className="form-group">
                            <input type="password"
                                   name="password"
                                   className={auth?.password ? 'invalid-input' : ''}
                                   autoComplete="off"
                                   onChange={onChangeSetNewUserAuth}
                                   placeholder={auth?.password ? auth?.password : 'Enter password'}
                            />
                        </div>
                        <div className="form-group">
                            <input type="password"
                                   name="conform-password"
                                   onChange={onChangeSetNewUser}
                                   autoComplete="off"
                                   placeholder={"Conform password"}
                            />
                        </div>
                        {message !== '' ? <p className="error_message">{message?.message}</p> : ''}
                        <div className="form_group next">
                            <input type="submit" value="Submit"/>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
  
}