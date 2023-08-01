
export const useGlobal = () => {

    const reload = (arg: () => void, args: () => void) => {
        if ((window.performance.getEntries()[0] as PerformanceNavigationTiming).type == 'reload') {
           arg()
        } else {
            args()
        }
    }

    return {
        reload
    }
}