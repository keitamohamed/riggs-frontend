import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux";

import store from "./setup/redux/store.ts";

import App from './App.tsx'
import UIContextProvider from "./setup/context/UIProvider.tsx";
import {RoomContextProvider} from "./setup/context/RoomProvider.tsx";
import AuthProvider from "./setup/context/AuthProvider.tsx";
import DashboardProvider from "./setup/context/dashboard-provider.tsx";

import 'swiper/css'
import 'swiper/css/navigation';
import "swiper/css/pagination";
import "./index.scss"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
    <Provider store={store}>
        <AuthProvider>
            <DashboardProvider>
                <UIContextProvider>
                    <RoomContextProvider>
                        <App />
                    </RoomContextProvider>
                </UIContextProvider>
            </DashboardProvider>
        </AuthProvider>
    </Provider>
)