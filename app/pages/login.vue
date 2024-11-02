<template>
  <div>
    <UCard>
      <template #header>
        Sign- In to Finance Tracker
      </template>

      <form>
        <UFormGroup label="email" name="email" class="mb-4" :required="true" help="You will recive an email for confirmation link">
          <UInput type="email" placeholder="Email" :required="true" />
        </UFormGroup>
        <UButton type="submit" variant="solid" color="black">Sign In</UButton>
      </form>

    </UCard>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>