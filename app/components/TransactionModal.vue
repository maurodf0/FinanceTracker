<template>
            <UModal v-model="isOpen">
                <UCard>
                    <template #header>
                    Add Transiction
                    </template>

                    <div>
                        <UFormGroup 
                            label="Amount" 
                            :required="true" 
                            name="amount" 
                            class="mb-4">
                            <UInput type="number" placeholder="Set di Amount"></UInput>
                        </UFormGroup>
                        <UFormGroup 
                            label="Transaction Date" 
                            :required="true" 
                            name="created_at" 
                            class="mb-4">
                            <UInput type="date" icon="i-heroicons-calendar-days-20-solid"></UInput>
                        </UFormGroup>
                        <UFormGroup 
                            label="Transaction Description" 
                            hint="Optional"
                            name="description" 
                            class="mb-4">
                            <UInput type="text" 
                                    icon="i-heroicons-calendar-days-20-solid"
                                    placeholder="Insert Description"></UInput>
                        </UFormGroup>
                        <UFormGroup 
                            label="Transaction Type" 
                            hint="Optional"
                            name="description" 
                            class="mb-4">
                            <UInput type="text" 
                                    icon="i-heroicons-calendar-days-20-solid"
                                    placeholder="Insert Description"></UInput>
                        </UFormGroup>
                    </div>

            
                </UCard>
      </UModal>
</template>

<script setup lang="ts">
   const props = defineProps({
        modelValue: Boolean
    })
   const emit = defineEmits(['update:modelValue'])

   const isOpen = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
   })
</script>