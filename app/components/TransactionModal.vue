<template>
            <UModal v-model="isOpen">
                <UCard>
                    <template #header>
                    Add Transiction
                    </template>

                  <UForm 
                    :state="state"
                    :schema="schema">
                    <UFormGroup 
                            label="Transaction Type" 
                            :required="true"
                            name="type" 
                            class="mb-4">
                            <USelect 
                                v-model="state.type"
                                placeholder="Add Transaction Type"
                                :options="types" ></USelect>
                        </UFormGroup>

                        <UFormGroup 
                            label="Amount" 
                            :required="true" 
                            name="amount" 
                            class="mb-4">
                            <UInput 
                                type="number" 
                                placeholder="Set di Amount"
                                v-model.number="state.amount"></UInput>
                        </UFormGroup>
                        <UFormGroup 
                            label="Transaction Date" 
                            :required="true" 
                            name="created_at" 
                            class="mb-4">
                            <UInput 
                                type="date" 
                                 v-model="state.created_at"
                                icon="i-heroicons-calendar-days-20-solid"></UInput>
                        </UFormGroup>
                        <UFormGroup 
                            label="Transaction Description" 
                            hint="Optional"
                            name="description" 
                            class="mb-4">
                            <UInput
                                v-model="state.description"
                                icon="i-heroicons-calendar-days-20-solid"
                                placeholder="Insert Description"></UInput>
                        </UFormGroup>
                        <UFormGroup 
                            label="Transaction Category" 
                            :required="true" 
                            name="category" 
                            class="mb-4"
                            v-if="state.type === 'Expense'">
                            <USelect 
                                  v-model="state.category"
                                type="select" 
                                :options="categories"></USelect> 
                        </UFormGroup>    
                  </UForm>

                    <UButton type="submit" color="black" variant="solid" label="Save" />
                </UCard>
      </UModal>
</template>

<script setup lang="ts">
import { categories, types } from '~~/constants';
import { z } from 'zod'


   const props = defineProps({
        modelValue: Boolean
    })
   const emit = defineEmits(['update:modelValue'])

   const isOpen = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
   })

   
const schema = z.object({
        created_at: z.string(),
        description: z.string().optional(),
        amount: z.number().positive('Amount must be more than 0')
})


   const state = ref({
        type: undefined,
        amount: 0,
        created_at: undefined,
        description: '',
        category: undefined
   })

</script>