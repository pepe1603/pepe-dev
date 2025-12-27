<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  title: 'Confirmación',
  name: 'auth-confirm',
})
</script>

<template>
  <div class="space-y-6 text-center">
    <UIcon
      name="i-lucide-loader-circle"
      class="w-10 h-10 animate-spin mx-auto text-primary"
    />

    <h2 class="text-xl font-semibold">
      Confirmando acceso
    </h2>

    <p class="text-muted">
      Estamos validando tu enlace seguro.
    </p>
  </div>
</template>
