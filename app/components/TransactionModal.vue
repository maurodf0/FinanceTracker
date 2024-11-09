<template>
            <UModal v-model="isOpen">
                <UCard>
                    <template #header>
                    {{ isEditing ? 'Edit' : 'Add'}} Transiction
                    </template>

                  <UForm 
                    :state="state"
                    :schema="schema"
                    ref="form"
                    @submit.prevent="save">
                    <UFormGroup 
                            label="Transaction Type" 
                            :required="true"
                            name="type" 
                            class="mb-4">
                            <USelect
                                :disabled="isEditing" 
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
                        <UButton type="submit" color="black" variant="solid" label="Save" :loading="isLoading" />
                  </UForm>

                </UCard>
      </UModal>
</template>

<script setup lang="ts">
import { categories, types } from '~~/constants';
import { z } from 'zod'


   const props = defineProps({
        modelValue: Boolean,
        transaction : {
            type: Object,
            required: false
        }
    })
    const isEditing = () => {
        return !!props.transaction
    }
   const emit = defineEmits(['update:modelValue', 'saved'])

   const isOpen = computed({
    get: () => props.modelValue,
    set: (value) => {
        if(!value){
            resetForm();
            emit('update:modelValue', value);
        }
    }
   })

   
const defaultSchema = z.object({
        created_at: z.string(),
        description: z.string().optional(),
        amount: z.number().positive('Amount must be more than 0')
})

const incomeSchema = z.object({
    type: z.literal('Income')
})
const investmentSchema = z.object({
    type: z.literal('Investment')
})
const savingSchema = z.object({
    type: z.literal('Saving')
})

const expenseSchema = z.object({
    type: z.literal('Expense'),
    category: z.enum(categories)
})

const form = ref();
const isLoading = ref();

const supabase = useSupabaseClient();
const {toastError, toastSuccess} = useAppToast();

const save = async () => {
    //if errors return
    if(form.value.errors.lenght) return ;

    //save into supabase
    isLoading.value = true;

    try {
        const { error } = await supabase.from('transactions').upsert({...state.value})
        if( !error ) {
            toastSuccess({
            title: 'Transaction saved',
            })
            isOpen.value = false;
            emit('saved');
            return
        }

        throw error;
    } catch (e){
        toastError({
            title: 'Error: Transaction not saved',
            description: e.message,
        })

    } finally {
        isLoading.value = false;
    }
    
}

const schema = z.intersection(
    z.discriminatedUnion('type', [incomeSchema, expenseSchema, savingSchema, investmentSchema]),
    defaultSchema
)

const initialState = {
        type: undefined,
        amount: 0,
        created_at: undefined,
        description: '',
        category: undefined
   }

   const state = ref(isEditing.value ? {
        type: props.transaction.type,
        amount: props.transaction.amout,
        created_at: props.transaction.created_at,
        description: props.transaction.description,
        category: props.transaction.category
   }  : 
   { 
    ...initialState
    })

   const resetForm = () => {
    return Object.assign(state.value, initialState);
    form.value.clear();
   }

</script>