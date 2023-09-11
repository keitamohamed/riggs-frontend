import {BsArrowRightSquare} from "react-icons/bs";
import {useContext} from "react";
import {UIActionContext} from "../../setup/context/context.ts";
import {useAppDispatch, useAppSelector} from "../../setup/redux/reduxHook.ts";
import {userAction} from "../../setup/redux/user.ts";
import {useForm} from "../../custom-hook/useForm.ts";
import {formAction} from "../../setup/redux/form.ts";

type props = {
    type: string
}
export const UserDetail = (prop: props) => {
    const uiCtx = useContext(UIActionContext)
    const dispatch = useAppDispatch()
    const {userForm, error, error: {address}} = useAppSelector((state) => state.form)
    const {user} = useAppSelector((state) => state.user)

    const {
        onChangeSetNewUser,
        onChangeSetNewUserAddress,
        onSubmitAddNewUser,
        onChangeSetUpdate,
        onChangeSetUpdateAddress,
        onSubmitSendUpdate
    } = useForm()

    const setRole = () => {
        if (userForm.auth.role == '') {
            dispatch(userAction.setRole({name: 'role', value: 'USER'}))
        }
    }

    const onClickCheckValidation = async (event: any) => {
        if (userForm.firstName == '' || userForm.lastName == '' || userForm.phoneNum == '') {
            await onSubmitAddNewUser(event)
        } else if (userForm.address.street == '' || userForm.address.city == '' ||
            userForm.address.state == '' || userForm.address.zipcode == '') {
            await onSubmitAddNewUser(event)
        } else {
            dispatch(formAction.reSetError())
            uiCtx.setShowAuth(true)
            if (user.auth.role == '')
                setRole()
        }
    }


    return (
        <div className='content sm:!w-[90%]'>
            <div className="title-container sm:!w-[100%]">
                {
                    prop.type == 'New' ? (
                            <div className="title-container sm:!w-[100%]">
                                <h1>Sign up</h1>
                                <p>It's quick and easy.</p>
                            </div>
                        ) :
                        <>
                            <h1>Update</h1>
                            <p>{`User ${uiCtx.getShowAuth() ? 'authentication update' : 'information update.'}`}</p>
                        </>
                }
            </div>
            <div className={`form sm:!w-[100%] block`}>
                <div className="form-group">
                    <input type="text"
                           className={error.firstName ? 'invalid-input' : ''}
                           name="firstName"
                           autoComplete="off"
                           onChange={prop.type == 'New' ? onChangeSetNewUser : onChangeSetUpdate}
                           placeholder={error.firstName ? error.firstName : 'Enter first name'}
                    />
                </div>
                <div className="form-group">
                    <input type="text"
                           name="lastName"
                           className={error.lastName ? 'invalid-input' : ''}
                           autoComplete="off"
                           onChange={prop.type == 'New' ? onChangeSetNewUser : onChangeSetUpdate}
                           placeholder={error.lastName ? error.lastName : 'Enter last name'}
                    />
                </div>
                <div className="form-group">
                    <input type="text"
                           name="phoneNum"
                           className={error.phoneNum ? 'invalid-input' : ''}
                           onChange={prop.type == 'New' ? onChangeSetNewUser : onChangeSetUpdate}
                           autoComplete="off"
                           placeholder={error.phoneNum ? error.phoneNum : 'Enter phone number'}
                    />
                </div>
                <div className="form-group">
                    <input type="text"
                           name="street"
                           className={address?.street ? 'invalid-input' : ''}
                           onChange={prop.type == 'New' ? onChangeSetNewUserAddress : onChangeSetUpdateAddress}
                           autoComplete="off"
                           placeholder={address?.street ? address?.street : "Enter street address"}
                    />
                </div>
                <div className="form-group">
                    <input type="text"
                           name="city"
                           className={address?.city ? 'invalid-input' : ''}
                           onChange={prop.type == 'New' ? onChangeSetNewUserAddress : onChangeSetUpdateAddress}
                           autoComplete="off"
                           placeholder={address?.city ? address?.city : 'Enter city'}
                    />
                </div>
                <div className="form-group">
                    <input type="text"
                           name="state"
                           className={address?.state ? 'invalid-input' : ''}
                           onChange={prop.type == 'New' ? onChangeSetNewUserAddress : onChangeSetUpdateAddress}
                           autoComplete="off"
                           placeholder={address?.state ? address?.state : 'Enter state'}
                    />
                </div>
                <div className="form-group">
                    <input type="text"
                           className={address?.zipcode ? 'invalid-input' : ''}
                           name="zipcode"
                           onChange={prop.type == 'New' ? onChangeSetNewUserAddress : onChangeSetUpdateAddress}
                           autoComplete="off"
                           placeholder={address?.zipcode ? address?.zipcode : 'Enter zipcode'}
                    />
                </div>
                {
                    prop.type == 'New' ?
                        <div className="form_group next">
                            <p className='sm:hidden block' onClick={onClickCheckValidation}>Next</p>
                            <p className='sm:block hidden' onClick={onClickCheckValidation}><BsArrowRightSquare/></p>
                        </div> :
                        <div className="form_group next">
                            <p className='sm:block hidden' onClick={onSubmitSendUpdate}>Update</p>
                            <p className=''>
                                <span onClick={() => uiCtx.setShowAuth(true)}>Edit Authenticate</span>
                            </p>
                        </div>
                }
            </div>
        </div>
    )
}