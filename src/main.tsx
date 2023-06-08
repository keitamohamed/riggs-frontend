import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux";

import store from "./setup/redux/store.ts";

import App from './App.tsx'
import "./index.scss"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
    <Provider store={store}>
        <App />
    </Provider>
)

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
