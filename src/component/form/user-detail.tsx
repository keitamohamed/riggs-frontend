import {useContext} from "react";

import {HiOutlineArrowRight} from "react-icons/hi";
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
    const {userForm, error: {errors}} = useAppSelector((state) => state.form)
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
                            <div className="title-context w-full">
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
                           className={errors?.firstName ? 'invalid-input' : ''}
                           name="firstName"
                           autoComplete="off"
                           onChange={prop.type == 'New' ? onChangeSetNewUser : onChangeSetUpdate}
                           placeholder={errors?.firstName ? errors.firstName : 'Enter first name'}
                    />
                </div>
                <div className="form-group">
                    <input type="text"
                           name="lastName"
                           className={errors?.lastName ? 'invalid-input' : ''}
                           autoComplete="off"
                           onChange={prop.type == 'New' ? onChangeSetNewUser : onChangeSetUpdate}
                           placeholder={errors?.lastName ? errors.lastName : 'Enter last name'}
                    />
                </div>
                <div className="form-group">
                    <input type="text"
                           name="phoneNum"
                           className={errors?.phoneNum ? 'invalid-input' : ''}
                           onChange={prop.type == 'New' ? onChangeSetNewUser : onChangeSetUpdate}
                           autoComplete="off"
                           placeholder={errors?.phoneNum ? errors.phoneNum : 'Enter phone number'}
                    />
                </div>
                <div className="form-group">
                    <input type="text"
                           name="street"
                           className={errors?.address?.street ? 'invalid-input' : ''}
                           onChange={prop.type == 'New' ? onChangeSetNewUserAddress : onChangeSetUpdateAddress}
                           autoComplete="off"
                           placeholder={errors?.address?.street ? errors.address?.street : "Enter street address"}
                    />
                </div>
                <div className="form-group">
                    <input type="text"
                           name="city"
                           className={errors?.address?.city ? 'invalid-input' : ''}
                           onChange={prop.type == 'New' ? onChangeSetNewUserAddress : onChangeSetUpdateAddress}
                           autoComplete="off"
                           placeholder={errors?.address?.city ? errors.address?.city : 'Enter city'}
                    />
                </div>
                <div className="form-group">
                    <input type="text"
                           name="state"
                           className={errors?.address?.state ? 'invalid-input' : ''}
                           onChange={prop.type == 'New' ? onChangeSetNewUserAddress : onChangeSetUpdateAddress}
                           autoComplete="off"
                           placeholder={errors?.address?.state ? errors.address?.state : 'Enter state'}
                    />
                </div>
                <div className="form-group">
                    <input type="text"
                           className={errors?.address?.zipcode ? 'invalid-input' : ''}
                           name="zipcode"
                           onChange={prop.type == 'New' ? onChangeSetNewUserAddress : onChangeSetUpdateAddress}
                           autoComplete="off"
                           placeholder={errors?.address?.zipcode ? errors.address?.zipcode : 'Enter zipcode'}
                    />
                </div>
                {
                    prop.type == 'New' ?
                        <div className="form_group next">
                            <p className='next-btn sm:hidden block' onClick={onClickCheckValidation}>Next</p>
                            <p className='sm:block hidden' onClick={onClickCheckValidation}><HiOutlineArrowRight/></p>
                        </div> :
                        <div className="form_group next">
                            <p className='' onClick={onSubmitSendUpdate}>Update</p>
                            <p className=''>
                                <span onClick={() => uiCtx.setShowAuth(true)}>Edit Authenticate</span>
                            </p>
                        </div>
                }
            </div>
        </div>
    )
}