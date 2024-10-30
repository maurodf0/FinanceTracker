import { endOfMonth, endOfYear, startOfDay, startOfMonth, startOfYear, sub, endOfDay } from "date-fns"

export const useSelectedTimePeriod = (period) => {
    const current = computed ( () => {
        switch (period.value) {
            case 'Yearly' : 
            return {
                current: {
                    from: startOfYear(new Date()),
                    to: new Date()
                }
            }
            case 'Monthly' : 
            return {
                current: {
                    from: startOfMonth(new Date()),
                    to: new Date()
                }

            }
            case 'Daily' : 
            return {
                current: {
                    from: startOfDay(new Date()),
                    to: new Date()
                }
            }
        }
    })


    const previous = computed ( () => {
        switch (period.value) {
            case 'Yearly' : 
            return {
                previous : {
                    from:  startOfYear(sub(new Date(), {years: 1})),
                    to:  endOfYear(sub(new Date(), {years: 1})),
                }
            }
            case 'Monthly' : 
            return {
                previous : {
                    from:  startOfMonth(sub(new Date(), {months: 1})),
                    to:  endOfMonth(sub(new Date(), {months: 1})),
                }
            }
            case 'Daily' : 
            return {
                previous : {
                    from:  startOfDay(sub(new Date(), {days: 1})),
                    to:  endOfDay(sub(new Date(), {days: 1})),
                }
            }
        }
    })


    return { current, previous }
}