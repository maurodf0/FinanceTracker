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
                You have {{  incomeCount  }} income and {{ expenseCount }} expense in this period
            </div>
        </div>
        <div>
            <UButton @click="isOpen = true" icon="i-heroicons-plus-circle" color="white" variant="solid" label="Add" />
            <UModal v-model="isOpen">
                <UCard>
                    <template #header>
                    <Placeholder class="h-8" />
                    </template>

                    <Placeholder class="h-32" />

                    <template #footer>
                    <Placeholder class="h-8" />
                    </template>
                </UCard>
      </UModal>
        </div>
    </section>

    <section v-if="!isLoading">
        <div 
            v-for="(transactionsOnDay, date) in transactionsGroupedByDate" 
            :key="date" >
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
import { transactionViewOptions } from '../constants.js';

const viewSelected = ref(transactionViewOptions[1]);
const supabase = useSupabaseClient();
const transactions = ref([]);
const isLoading = ref(false);
const isOpen = ref(false);

const income = computed( () => {
    return transactions.value.filter( t => {
        return  t.type === 'Income'
    })
})

const expense = computed( () => {
    return transactions.value.filter( t => {
        return t.type === 'Expense';
    })
} )

const incomeCount = computed( () => {
    return income.value.length
})
const expenseCount = computed( () => {
    return expense.value.length
})

const incomeTotal = computed(() => {
    return income.value.reduce((sum, transaction) => {
        return sum + transaction.amount; // Aggiungere il return qui
    }, 0);
});
const expenseTotal = computed(() => {
    return expense.value.reduce((sum, transaction) => {
        return sum + transaction.amount; // Aggiungere il return qui
    }, 0);
});

const fetchTransactions = async () => {
    isLoading.value = true;
    try {
    //without useAsyncData this works on client and server, so twice
    const { data } = await useAsyncData( 'transactions', async () => {
    const {data, error} = await supabase
    .from('transactions')
    .select()

    if (error ) return [];

        return data
} )

    return data.value
    } finally {
       isLoading.value = false;
    }

}

const refreshTransactions = async () => transactions.value = await fetchTransactions();

await refreshTransactions();


const transactionsGroupedByDate = computed(() => {
    let grouped = {}

    for (const transaction of transactions.value) {
      const date = transaction.created_at.split('T')[0]

      if (!grouped[date]) {
        grouped[date] = []
      }

      grouped[date].push(transaction)
    }

    return grouped
  })

</script>