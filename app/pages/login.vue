<template>
  <div>
    <UCard v-if="!success">
      <template #header>
        Sign- In to Finance Tracker
      </template>

      <form>
        <UFormGroup label="email" name="email" class="mb-4" :required="true" help="You will recive an email for confirmation link">
          <UInput type="email" placeholder="Email" :required="true" />
        </UFormGroup>
        <UButton @click="success = true" type="submit" variant="solid" color="black">Sign In</UButton>
      </form>

    </UCard>

    <UCard v-else>
      <template #header>
        Email has been sent
      </template>
      <div class="text-center">
        <p>We have sent an email to <strong>youremail@gmail.com</strong> with a link for sign in</p>
        <p><stong>Important:</stong> The link will expire in 10 minutes</p>
      </div>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
  const success = ref(false);
</script>

<style>

</style>