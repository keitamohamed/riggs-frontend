import {Index} from "../../component/page";
import {Register} from "../../component/page/register.tsx";
import {Login} from "../../component/page/login.tsx";

export const routePath = [
    {
        name: "Index",
        path: "/",
        protected: false,
        showLink: false,
        component: Index
    },
    {
        name: "Register",
        path: "/register",
        protected: false,
        showLink: false,
        component: Register
    },
    {
        name: "Login",
        path: "/login",
        protected: false,
        showLink: false,
        component: Login
    }
]