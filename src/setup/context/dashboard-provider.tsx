import {DashboardContext} from "./context.ts";
import {Props} from "../../interface/interface.ts";
import {useState} from "react";


const {Provider} = DashboardContext
const DashboardProvider = ({children}: Props) => {
    const [dashboard, setDashboard] = useState<{
        showDash: string, showForm: string
    }>({
        showDash: 'dashboard-one',
        showForm: ''
    })
    const getDisplayComponent = () => {
      return dashboard.showDash
    }

    const setDisplayComponentType = (display: string) => {
      setDashboard(
          {
              ...dashboard,
              showDash: display
          }
      )
    }

    const getFormType = () => {
        return dashboard.showForm
    }

    const setFormType = (type: string) => {
        setDashboard({...dashboard, showForm: type})
    }

    return (
        <Provider value={{
            getDisplayComponent,
            setDisplayComponentType,
            getFormType,
            setFormType
        }}>
            {children}
        </Provider>
    )

}

export default DashboardProvider