import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux";

import store from "./setup/redux/store.ts";

import App from './App.tsx'
import UIContextProvider from "./setup/context/UIProvider.tsx";
import {RoomContextProvider} from "./setup/context/RoomProvider.tsx";


import "./index.scss"
import AuthProvider from "./setup/context/AuthProvider.tsx";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
    <Provider store={store}>
        <AuthProvider>
            <UIContextProvider>
                <RoomContextProvider>
                    <App />
                </RoomContextProvider>
            </UIContextProvider>
        </AuthProvider>
    </Provider>
)

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
