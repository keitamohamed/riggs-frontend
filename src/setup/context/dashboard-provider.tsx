import {DashboardContext} from "./context.ts";
import {Props} from "../../interface/interface-type.ts";
import {useState} from "react";


const {Provider} = DashboardContext
const DashboardProvider = ({children}: Props) => {
    const [dashboard, setDashboard] = useState<{
        showDash: string,
        showForm: string,
        actionType: string
    }>({
        showDash: 'dashboard-one',
        showForm: '',
        actionType: ''
    })
    const getDisplayComponent = () => {
      return dashboard.showDash
    }

    const setDisplayComponentType = (display: string) => {
      setDashboard(
          {
              ...dashboard,
              actionType: display == 'add-room' || display == 'add-user' ? 'Submit' : 'Update',
              showDash: display
          }
      )
    }

    const getFormType = () => {
        return dashboard
    }

    const setFormType = (type: string, actionType: string) => {
        setDashboard({
            ...dashboard,
            showDash: type,
            showForm: type,
            actionType: actionType
        })
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