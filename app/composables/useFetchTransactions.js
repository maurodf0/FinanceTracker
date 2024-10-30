 export const useFetchTransactions = (period) => {
    const supabase = useSupabaseClient();

    const transactions = ref([]);
    const pending = ref(false);

    // Computed properties per filtrare le transazioni in base al tipo
const income = computed(() => {
    return transactions.value.filter(t => {
        return t.type === 'Income';
    });
});

const expense = computed(() => {
    return transactions.value.filter(t => {
        return t.type === 'Expense';
    });
});

// Computed properties per contare il numero di transazioni
const incomeCount = computed(() => {
    return income.value.length;
});
const expenseCount = computed(() => {
    return expense.value.length;
});

// Computed properties per calcolare il totale delle transazioni
const incomeTotal = computed(() => {
    return income.value.reduce((sum, transaction) => {
        return sum + transaction.amount;
    }, 0);
});
const expenseTotal = computed(() => {
    return expense.value.reduce((sum, transaction) => {
        return sum + transaction.amount;
    }, 0);
});


// Funzione per recuperare le transazioni dal database
const fetchTransactions = async () => {
    pending.value = true;
    try {
        // Recupera i dati delle transazioni
        const { data } = await useAsyncData(`transactions-${period.value.from.toDateString()}-${period.value.to.toDateString()}`, async () => {
            const { data, error } = await supabase
                .from('transactions')
                .select()
                .gte('created_at', period.value.from.toISOString())
                .gte('created_at', period.value.to.toISOString())
                .order('created_at', { ascending: false });

            if (error) return [];

            return data;
        });

        return data.value;
    } finally {
        pending.value = false;
    }
}


// Funzione per aggiornare la lista delle transazioni
const refresh = async () => {
    transactions.value = await fetchTransactions();
}


// Computed property per raggruppare le transazioni per data
const transactionsGroupedByDate = computed(() => {
    let grouped = {};

    // Raggruppa le transazioni per data
    for (const transaction of transactions.value) {
        const date = transaction.created_at.split('T')[0];

        if (!grouped[date]) {
            grouped[date] = [];
        }

        grouped[date].push(transaction);
    }

    // Ordina le date in ordine decrescente
//     const sortedKeys = Object.keys(grouped).sort().reverse();
    
// const sortedGrouped = {};

//     // Crea un nuovo oggetto raggruppato con le date ordinate
//     for (const key of sortedKeys) {
//         sortedGrouped[key] = grouped[key];
//     }

//     return sortedGrouped;});

return grouped;
})


return {
    transactions: {
        all: transactions,
        grouped: {
            byDate: transactionsGroupedByDate
        },
        income,
        expense,
        incomeTotal,
        expenseTotal,
        incomeCount,
        expenseCount
    },
    refresh,
    pending
}

}