import {Index} from "../../component/page";
import {Register} from "../../component/page/register.tsx";
import {Login} from "../../component/page/login.tsx";
import {User} from "../../component/page/user.tsx";
import {Profile} from "../../component/page/profile.tsx";

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
    },
    {
        name: "User",
        path: "/user",
        protected: false,
        showLink: false,
        component: User
    },
    {
        name: "Profile",
        path: "/profile",
        protected: false,
        showLink: false,
        component: Profile
    }
]