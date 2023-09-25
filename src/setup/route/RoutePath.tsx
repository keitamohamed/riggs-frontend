import {Index} from "../../component/page";
import {RegisterNewUser} from "../../component/page/registerNewUser.tsx";
import {Login} from "../../component/page/login.tsx";
import {Profile} from "../../component/page/profile.tsx";
import {Booking} from "../../component/page/booking.tsx";
import {Dashboard} from "../../component/page/dashboard.tsx";

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
        component: RegisterNewUser
    },
    {
        name: "Login",
        path: "/login",
        protected: false,
        showLink: false,
        component: Login
    },
    {
        name: "Dash",
        path: "/dash",
        protected: true,
        adminProtected: true,
        showLink: false,
        component: Dashboard
    },
    {
        name: "Booking",
        path: "/booking",
        protected: false,
        showLink: false,
        component: Booking
    },
    {
        name: "Profile",
        path: "/profile",
        protected: true,
        showLink: false,
        component: Profile
    }
]