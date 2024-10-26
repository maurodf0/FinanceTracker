<template>
       <UButton v-model="isOpen = true" icon="i-heroicons-plus-circle" color="white" variant="solid" label="Add" />
            <UModal v-model="isOpen">
                <UCard>
                    <template #header>
                    Add Transiction
                    </template>

                    Yo

            
                </UCard>
      </UModal>
</template>

<script setup lang="ts">
    defineProps({
        modelValue: Boolean
    })
   const emit = defineEmits(['update:modelValue'])

   const isOpen = computed(
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
   )
</script>