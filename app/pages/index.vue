<template>
    <section class="flex items-center justify-between mb-10">
        <h1 class="text-4xl font-extrabold">Summary</h1>
        <div>
            <USelectMenu v-model="viewSelected" :options="transactionViewOptions" />
        </div>
    </section>

    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10">
        <AppTrend color="green" title="Income" :amount="4000" :last-amount="3000" :loading="false" />
        <AppTrend color="green" title="Expense" :amount="4000" :last-amount="7000" :loading="false" />
        <AppTrend color="red" title="Invesment" :amount="4000" :last-amount="5000" :loading="false" />
        <AppTrend color="green" title="Saving" :amount="4000" :last-amount="1000" :loading="false" />
    </section>
</template>


<script setup lang="ts">
import { transactionViewOptions } from '../constants.js';

const viewSelected = ref(transactionViewOptions[1]);

</script>