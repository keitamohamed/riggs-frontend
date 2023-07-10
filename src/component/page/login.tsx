import {AiOutlineLogin} from "react-icons/ai";
import {useLogin} from "../../custom-hook/useLogin.ts";
import {useNavigate} from "react-router-dom";

export const Login = () => {
    const nav = useNavigate()
    const {error, onChange, onSubmit} = useLogin()

    return (
        <>
            <div className="login_container">
                <div className="content">
                    <form action=""
                          onSubmit={onSubmit}
                          className="form sm:!w-[90%]">
                        <div className="form-group">
                            <input type="email"
                                   name="email"
                                   autoComplete="off"
                                   onChange={onChange}
                                   placeholder={error?.email ? error.email : "Enter your email"}
                            />
                        </div>
                        <div className="form-group">
                            <input type="password"
                                   name="password"
                                   autoComplete="new-password"
                                   onChange={onChange}
                                   placeholder={error?.password ? error.password : "Enter password"}
                            />
                        </div>
                        {error?.message !== '' ? <p className="error_message">{error?.message}</p> : ''}
                        <div className="form_group submit">
                            <p className={`pointer sm:hidden`}><input type="submit"></input></p>
                            <p className={`pointer sm:block hidden`}><AiOutlineLogin/></p>
                            <div className="no-account">
                                <p>Don't have an account?</p>
                                <p onClick={() => nav("/register")}>Sign up</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}