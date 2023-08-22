import {Index} from "../../component/page";
import {Register} from "../../component/page/register.tsx";
import {Login} from "../../component/page/login.tsx";
import {Profile} from "../../component/page/profile.tsx";
import {AdminDashboard} from "../../component/page/admin.tsx";
import {Booking} from "../../component/page/booking.tsx";
import {Room} from "../../component/page/room.tsx";

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
        name: "Room",
        path: "/room",
        protected: true,
        adminProtected: true,
        showLink: false,
        component: Room
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