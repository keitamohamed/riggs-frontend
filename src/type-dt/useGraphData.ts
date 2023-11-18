
import moment from "moment";
moment.locale('en')

export const useGraphData = () => {

    const getMonth = (): string[] => {
        moment.months()
        return moment.monthsShort()
    }

    return {getMonth}
}