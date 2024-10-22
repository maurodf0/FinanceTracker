<template>
    <section class="flex items-center justify-between mb-10">
        <h1 class="text-4xl font-extrabold">Summary</h1>
        <div>
            <USelectMenu v-model="viewSelected" :options="transactionViewOptions" />
        </div>
    </section>
</template>


<script setup lang="ts">
import { transactionViewOptions } from '../constants.js';

const viewSelected = ref(transactionViewOptions[1]);

</script>