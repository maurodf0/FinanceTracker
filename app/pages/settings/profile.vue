<template>
    <UForm @submit="saveProfile" :state="state" :schema="schema">
        <UFormGroup class="mb-4" label="Full Name" name="name">
            <UInput v-model="state.name" />
        </UFormGroup>
        <UFormGroup class="mb-4" label="Email" name="email" help="You will receive a confirmation on both, old ad new email for the confirmation">
            <UInput v-model="state.email" />
        </UFormGroup>
        <UButton type="submit" color="black" variant="solid" label="Save" :loading="pending"/>
    </UForm>

</template>

<script setup>
import {z} from 'zod';
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const { toastSuccess, toastError } = useAppToast();
const pending = ref(false);

const state = ref({
    name: user.value.user_metadata?.full_name,
    email: user.value.email
})

const schema = z.object({
    name: z.string().min(2).optional(),
    email: z.string().email()
});

const saveProfile = async() => {
    pending.value = true;

    try {
        
    const { error } = await supabase.auth.updateUser({
        data: {
            full_name: state.value.name
        }
        })
        if(error) throw error;
        toastSuccess({
            title: 'Profile Updated',
            description: 'Your profile is correctly updated'
        })
    } catch(error) {
        toastError({
            title: 'Error updating profile',
            description: error.message
        })
    } finally {
        pending.value = false;
    }
}   

</script>