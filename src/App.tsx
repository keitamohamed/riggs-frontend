import RouteSwitch from "./setup/route/RouteSwitch.tsx";

import './App'
import {useContext, useEffect} from "react";
import {AuthContext} from "./setup/context/context.ts";
import {useUser} from "./custom-hook/useUser.ts";

function App() {
    const authCtx = useContext(AuthContext)
    const {findUserByEmail} = useUser()

    useEffect(() => {
        if (authCtx.isAuthenticated()) {
            setInterval(() => findUserByEmail(authCtx.getCookie().email), (60 * 2000))
        }
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
