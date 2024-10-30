export const useSelectedTimePeriod = (period) => {
    const dates = computed ( () => {
        switch (period.value) {
            case'Yearly' : 
            return {
                current: {
                    from: null,
                    to: null
                }, 
                previous : {
                    from: null,
                    to: null
                }
            }
        }
    })


    return dates
}