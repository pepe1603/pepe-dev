<!-- app/layout/auth.vue -->
<script setup lang="ts">
import { useSeoHead } from '~/composables/public/seo/useSeoHead'

useSeoHead({
  title: 'Autenticación | Pepe.dev',
  description: 'Accede o crea tu cuenta en Pepe.dev',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <div
    class="min-h-screen grid grid-cols-1 lg:grid-cols-2
           bg-linear-to-br from-neutral-50 to-neutral-100
           dark:from-neutral-950 dark:to-neutral-900"
  >
    <!-- Brand / Context -->
    <section
      class="hidden lg:flex flex-col justify-center px-16
             border-r border-neutral-200 dark:border-neutral-800"
    >
      <div class="max-w-md space-y-6">
        <UIcon
          name="i-lucide-code"
          class="w-12 h-12 text-primary"
        />

        <h1 class="text-4xl font-bold tracking-tight">
          Pepe.dev
        </h1>

        <p class="text-muted text-lg leading-relaxed">
          Plataforma personal de proyectos, experiencia profesional
          y gestión de perfil.
        </p>

        <USeparator />

        <p class="text-sm text-muted">
          Acceso privado para administración y edición de contenido.
        </p>
      </div>
    </section>

    <!-- Auth Content -->
    <section class="flex items-center justify-center px-6 py-12">
      <UContainer class="w-full max-w-md">
        <div class="mb-4">
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-1 text-sm text-muted hover:text-primary transition"
          >
            <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
            Volver al sitio
          </NuxtLink>
        </div>
        <UCard
          class="backdrop-blur-sm"
          :ui="{
            root: 'relative',
            body: 'space-y-6',
          }"
        >
          <slot />
        </UCard>
      </UContainer>
    </section>
  </div>
</template>
