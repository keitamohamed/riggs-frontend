import RouteSwitch from "./setup/route/RouteSwitch.tsx";

import './App'
import {useContext, useEffect} from "react";
import {AuthContext} from "./setup/context/context.ts";
import {useUser} from "./custom-hook/useUser.ts";
import {useGlobal} from "./custom-hook/useGlobal.ts";

function App() {
    const authCtx = useContext(AuthContext)
    const {findUserByEmail} = useUser()
    const {reload} = useGlobal()

    useEffect(() => {
        if (authCtx.isAuthenticated()) {
            setInterval(() => findUserByEmail(authCtx.getCookie().email), (60 * 60 * 1000))
        }
        reload(() => findUserByEmail(authCtx.getCookie().email))
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
