<template>
  <div>
    <div v-if="!success" class="flex flex-col gap-3">
      <LoginCard>
      <UButton
        class="mt-3"
        icon="i-mdi-github"
        block
        label="Github"
        color="gray"
        variant="solid"
        @click="signInWithOAuth"
      />
    </LoginCard>

    <UCard v-if="!success">
      <template #header>
        Sign-In to Finance Tracker
      </template>

      <UForm @submit="handleLogin">
        <UFormGroup label="email" name="email" class="mb-4" :required="true" help="You will recive an email for confirmation link">
          <UInput type="email" placeholder="Email" :required="true" v-model="email" />
        </UFormGroup>
        <UButton :disabled="pending" :loading="pending" type="submit" variant="solid" color="black">Sign In</UButton>
      </UForm>

    </UCard>
  </div>


    <UCard v-else>
      <template #header>
        Email has been sent
      </template>
      <div class="text-center">
        <p>We have sent an email to <strong>{{email.value}}</strong> with a link for sign in</p>
        <p><strong>Important:</strong> The link will expire in 10 minutes</p>
      </div>
    </UCard>
    
    <UCard>
      <template #header>
        Not have an account? Sign-Up
      </template>
      <UForm @submit="handleRegister">
        <UFormGroup label="email" name="email" class="mb-4" :required="true" help="You will recive an email for confirmation link">
          <UInput type="email" placeholder="Email" :required="true" v-model="emailregister" />
        </UFormGroup>
        <UFormGroup label="Password" name="Password" class="mb-4" :required="true" >
          <UInput type="password" placeholder="Password" :required="true" v-model="password" />
        </UFormGroup>
        <UButton :disabled="pendingRegister" :loading="pendingRegister" type="submit" variant="solid" color="black">Sign In</UButton>
      </UForm>
    </UCard>

   
  </div>
  <UNotifications />
</template>

<script lang="ts" setup>
  const success = ref(false);
  const email = ref('');
  const pending = ref();
  const pendingRegister = ref();
  const emailRegister = ref('');
  const password = ref('');
  const {toastError, toastSuccess} = useAppToast();
  const supabase = useSupabaseClient();

  const signInWithOAuth = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: 'http://localhost:3000/confirm',
    },
  })
  if (error) console.log(error)
}

  useRedirectIfAuth();

  const handleLogin = async () => {
    pending.value = true;

    try {
      const {error} = await supabase.auth.signInWithOtp({
        email: email.value,
        options: {
          emailRedirectTo: 'http://localhost:3000/confirm'
        }
      })

      if(error){
        toastError({
          title: 'Error Authentication',
          description: error.message,
        })
      }  else {
  
          success.value = true;
        }
    } finally {
      pending.value = false;

    }
  }

  const handleRegister = async () => {

   pending.value = true;
      try {
    const { error } = await supabase.auth.signUp({
      email: emailRegister.value,
      password: password.value,

})
      
 
  if(error){
        toastError({
          title: 'Error Authentication',
          description: error.message,
        })
      }  else {
  
          success.value = true;
        }
      
      } finally {
  pending.value = false;
}
  }
</script>

<style>

</style>