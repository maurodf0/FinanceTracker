<template>
            <UModal v-model="isOpen">
                <UCard>
                    <template #header>
                    Add Transiction
                    </template>

                    <div>
                        <UFormGroup label="Amount" :required="true" name="amount" class="">

                        </UFormGroup>
                    </div>>

            
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