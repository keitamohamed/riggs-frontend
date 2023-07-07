import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import {routePath} from "./RoutePath.tsx";
import {useContext} from "react";
import {AuthContext} from "../context/context.ts";

const RouteSwitch = () => {
    const authCtx = useContext(AuthContext)

    return (
        <BrowserRouter>
            <Routes>
                {
                    routePath.map((path, index) => {
                        const isAuthenticate = authCtx.isAuthenticated();
                        const isAdmin = authCtx.isAdmin()
                        return (
                            path.protected && path.adminProtected ? (
                                <Route key={`${path.name}_${index}`}
                                       {...path}
                                    element={isAuthenticate && isAdmin ?
                                        <path.component/> : <Navigate replace to={"/"} />}
                                />
                            ) : path.protected ? (
                                <Route key={`${path.name}_${index}`}
                                       {...path}
                                       element={isAuthenticate ?
                                           <path.component/> : <Navigate replace to={"/"} />}
                                />
                            ) : <Route key={`${path.name}_${index}`} path={path.path} element={<path.component/>} />
                        )
                    })
                }
            </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitch