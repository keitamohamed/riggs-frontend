import {AiOutlineLogin} from "react-icons/ai";
import {useLogin} from "../../custom-hook/useLogin.ts";

export const Login = () => {
    const {error, onChange, onSubmit} = useLogin()

    return (
        <>
            <div className="login_container">
                <div className="content">
                    <form action=""
                          onSubmit={onSubmit}
                          className="form">
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
                            <input type="submit"/>
                            <AiOutlineLogin/>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}