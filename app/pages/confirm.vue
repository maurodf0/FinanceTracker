<template>
    <UCard>
        <template #header>
            Signing in....
        </template>
        Wait a moment while we signing you in
    </UCard>
</template>

<script setup>

const user = useSupabaseUser();

watch(user, (user) => {
   if(user) {
    return navigateTo('/');
   }
}, {immediate: true})

</script>