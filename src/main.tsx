import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux";

import store from "./setup/redux/store.ts";

import App from './App.tsx'
import UIContextProvider from "./setup/context/UIProvider.tsx";


import "./index.scss"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
    <Provider store={store}>
        <UIContextProvider>
            <App />
        </UIContextProvider>
    </Provider>
)

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
