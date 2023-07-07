import {Index} from "../../component/page";
import {Register} from "../../component/page/register.tsx";
import {Login} from "../../component/page/login.tsx";
import {User} from "../../component/page/user.tsx";
import {Profile} from "../../component/page/profile.tsx";
import {AdminDashboard} from "../../component/page/admin.tsx";

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
        protected: true,
        showLink: false,
        component: User
    },
    {
        name: "Profile",
        path: "/profile",
        protected: true,
        showLink: false,
        component: Profile
    },
    {
        name: "Admin",
        path: "/admin",
        protected: true,
        adminProtected: true,
        showLink: false,
        component: AdminDashboard
    }
]