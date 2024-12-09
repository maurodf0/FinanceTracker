<template>
    <section class="flex items-center justify-between mb-10">
        <h1 class="text-4xl font-extrabold">Summary</h1>
        <div>
            <USelectMenu v-model="viewSelected" :options="transactionViewOptions" />
        </div>
    </section>

    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10">
        <AppTrend color="green" title="Income" :amount="incomeTotal" :last-amount="prevIncomeTotal" :loading="pending" />
        <AppTrend color="red" title="Expense" :amount="expenseTotal" :last-amount="prevExpenseTotal" :loading="pending" />
        <AppTrend color="red" title="Invesment" :amount="invesmentTotal" :last-amount="5000" :loading="pending" />
        <AppTrend color="green" title="Saving" :amount="savingsTotal" :last-amount="1000" :loading="pending" />
    </section>

    <section class="flex justify-between mb-10 items-center">
        <div>
            <h2 class="text-2xl font-extrabold">Transactions</h2>
            <div class="text-gray-500 dark:text-gray-400">
                You have {{ incomeCount }} income and {{ expenseCount }} expense in this period
            </div>
        </div>
        <div>
            <TransactionModal v-model="isOpen" @saved="refresh"/>
            <UButton icon="i-heroicons-plus-circle" color="white" variant="solid" label="Add" @click="isOpen = true" />
        </div>
    </section>

    <section v-if="!pending">
        <div 
            v-for="(transactionsOnDay, date) in byDate" 
            :key="date">
            <DailyTransaction :date="date" :transactions="transactionsOnDay" />
            <FinanceTransaction 
                v-for="transaction in transactionsOnDay" 
                :key="transaction.id"
                :transaction="transaction"
                @deleted="refresh"
                @edited="refresh"
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

const user = useSupabaseUser();

const viewSelected = ref(user.value.user_metadata?.transactionView ?? transactionViewOptions[1]);

const {current, previous } = useSelectedTimePeriod(viewSelected);
console.log(current);

const { pending, refresh, transactions: {
    incomeCount,
    expenseCount,
    incomeTotal,
    expenseTotal,
    savingsCount,
    savingsTotal,
    invesmentTotal,
    invesmentCount,
    grouped: {
        byDate
    }
}} = useFetchTransactions(current);
await refresh();

const {refresh: refreshPrevious, transactions: {
    incomeTotal : prevIncomeTotal,
    expenseTotal: prevExpenseTotal,
}} = useFetchTransactions(previous);

const isOpen = ref(false);
// Chiama la funzione per aggiornare le transazioni quando il componente è montato
await refreshPrevious();


</script>
