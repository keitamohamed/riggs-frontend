import RouteSwitch from "./setup/route/RouteSwitch.tsx";

import './App'
import {useContext, useEffect} from "react";
import {AuthContext} from "./setup/context/context.ts";
import {useUser} from "./custom-hook/useUser.ts";
import {useGlobal} from "./custom-hook/useGlobal.ts";
import {useBooking} from "./custom-hook/useBooking.ts";

function App() {
    const authCtx = useContext(AuthContext)
    const {findUserByEmail} = useUser()
    const {loadingBookings} = useBooking()
    const {reload} = useGlobal()

    useEffect(() => {
        if (authCtx.isAuthenticated()) {
            setInterval(() => findUserByEmail(authCtx.getCookie().email), (60 * 60 * 1000))
        } else {
            authCtx.setExpiredToken({accessToken: '', role: '', email: ''})
        }
        if (authCtx.isAdmin()) {
            setInterval(loadingBookings, (60 * 60 * 1000))
        }
        reload(() => findUserByEmail(authCtx.getCookie().email))
        reload(() => loadingBookings())
    }, [authCtx])

  return (
    <>
      <div className="App">
          <RouteSwitch/>
      </div>
    </>
  )
}

export default App
