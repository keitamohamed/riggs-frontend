export const useGlobal = () => {
    const reload = (arg: () => void) => {
        if ((window.performance.getEntries()[0] as PerformanceNavigationTiming).type == 'reload') {
           arg()
        }
    }

    const setTimer = () => {
      // setInterval(() => findUserByEmail(authCtx.getCookie().email), 30000)
    }

    return {
        reload,
        setTimer
    }
}