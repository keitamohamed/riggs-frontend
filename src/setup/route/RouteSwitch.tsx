import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import {routePath} from "./RoutePath.tsx";

const RouteSwitch = () => {

    return (
        <BrowserRouter>
            <Routes>
                {
                    routePath.map((path, index) => {
                        const isAuthenticate = true;
                        return (
                            path.protected ? (
                                <Route key={`${path.name}_${index}`}
                                       {...path}
                                    element={isAuthenticate ? <path.component/> : <Navigate replace to={"/"} />}
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