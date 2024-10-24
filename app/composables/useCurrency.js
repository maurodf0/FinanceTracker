export const useCurrency = (amount) => {
    const currency = current ( () => {
        return new Intl.NumberFormat(locales: 'it-IT', {
            style: 'currency',
            currency: 'EUR'
        }).format(isRef(amout) ? amount.value : amount)
    }) 

    return {
        currency
    }
}