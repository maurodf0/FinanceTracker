<template>
  <div>
    <UCard v-if="!success">
      <template #header>
        Sign- In to Finance Tracker
      </template>

      <form @submit.prevent="handleLogin">
        <UFormGroup label="email" name="email" class="mb-4" :required="true" help="You will recive an email for confirmation link">
          <UInput type="email" placeholder="Email" :required="true" v-model="email" />
        </UFormGroup>
        <UButton type="submit" variant="solid" color="black">Sign In</UButton>
      </form>

    </UCard>

    <UCard v-else>
      <template #header>
        Email has been sent
      </template>
      <div class="text-center">
        <p>We have sent an email to <strong>{{email.value}}</strong> with a link for sign in</p>
        <p><stong>Important:</stong> The link will expire in 10 minutes</p>
      </div>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
  const success = ref(false);
  const email = ref('');
  const pending = ref();
  const toast = useToast();
  const supabase = useSupabaseClient();

  const handleLogin = async () => {
    pending.value = true;

    try {
      const {error} = await supabase.auth.signInWithOtp({
        email: email.value,
        options: {
          emailRedirectTo: 'http//localhost:3000'
        }
      })

      if(error){
        toast.add({
          title: 'Error Authentication',
          icon: 'i-heroicons-exclamation-cirlce',
          description: error.message,
          color: 'red'
        })
      }  else {
          success.value
        }
    } finally {
      pending.value = false;

    }
  }
</script>

<style>

</style>