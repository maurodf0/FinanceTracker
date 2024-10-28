<template>
    <section class="flex items-center justify-between mb-10">
        <h1 class="text-4xl font-extrabold">Summary</h1>
        <div>
            <USelectMenu v-model="viewSelected" :options="transactionViewOptions" />
        </div>
    </section>

    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10">
        <AppTrend color="green" title="Income" :amount="incomeTotal" :last-amount="3000" :loading="isLoading" />
        <AppTrend color="red" title="Expense" :amount="expenseTotal" :last-amount="7000" :loading="isLoading" />
        <AppTrend color="red" title="Invesment" :amount="4000" :last-amount="5000" :loading="isLoading" />
        <AppTrend color="green" title="Saving" :amount="4000" :last-amount="1000" :loading="isLoading" />
    </section>

    <section class="flex justify-between mb-10 items-center">
        <div>
            <h2 class="text-2xl font-extrabold">Transactions</h2>
            <div class="text-gray-500 dark:text-gray-400">
                You have {{ incomeCount }} income and {{ expenseCount }} expense in this period
            </div>
        </div>
        <div>
            <TransactionModal v-model="isOpen" @saved="refreshTransactions"/>
            <UButton icon="i-heroicons-plus-circle" color="white" variant="solid" label="Add" @click="isOpen = true" />
        </div>
    </section>

    <section v-if="!isLoading">
        <div 
            v-for="(transactionsOnDay, date) in transactionsGroupedByDate" 
            :key="date">
            <DailyTransaction :date="date" :transactions="transactionsOnDay" />
            <FinanceTransaction 
                v-for="transaction in transactionsOnDay" 
                :key="transaction.id"
                :transaction="transaction"
                @deleted="refreshTransactions"
            />
        </div>
    </section>

    <section v-else>
        <USkeleton class="h-8 w-full mb-2" v-for="i in 2" />
    </section>
    <UNotifications />
</template>


<script setup lang="ts">
import { ref, computed } from 'vue';
import { transactionViewOptions } from '../constants.js';

const viewSelected = ref(transactionViewOptions[1]);
const supabase = useSupabaseClient();
const transactions = ref([]);
const isLoading = ref(false);
const isOpen = ref(false);

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
    isLoading.value = true;
    try {
        // Recupera i dati delle transazioni
        const { data } = await useAsyncData('transactions', async () => {
            const { data, error } = await supabase
                .from('transactions')
                .select()
                .order('created_at', { ascending: false });

            if (error) return [];

            return data;
        });

        return data.value;
    } finally {
        isLoading.value = false;
    }
}

// Funzione per aggiornare la lista delle transazioni
const refreshTransactions = async () => {
    transactions.value = await fetchTransactions();
}

// Chiama la funzione per aggiornare le transazioni quando il componente è montato
await refreshTransactions();

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
</script>
