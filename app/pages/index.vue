<!-- app/pages/index.vue -->
<script setup lang="ts" name="LandingPage">
import ProfileHero from '~/components/ui/ProfileHero.vue'
import TechnologiesSection from '~/components/ui/TechnologiesSection.vue'

import { usePublicProfileCase } from '~/composables/public/usecases/usePublicProfileUseCase'
import { usePublicTechnologiesCase } from '~/composables/public/usecases/usePublicTechnologiesUseCase'

import { useHomeSeoUseCase } from '~/composables/public/seo/useHomeSeoUseCase'
import { useSeoHead } from '~/composables/public/seo/useSeoHead'

definePageMeta({
  name: 'home',
  title: 'Home',
})

const seo = useHomeSeoUseCase()

useSeoHead(seo)

const {
  data: profile,
  pending: profilePending,
  error: profileError,
} = usePublicProfileCase()

const {
  data: technologies,
  pending: technologiesPending,
  error: technologiesError
} = usePublicTechnologiesCase()

</script>

<template>
  <main class="space-y-24">

    <!-- PROFILE -->
    <section>
      <USkeleton
        v-if="profilePending"
        class="h-64 w-full"
      />

      <UAlert
        v-else-if="profileError"
        title="Error"
        description="No se pudo cargar el perfil"
        icon="i-lucide-alert-circle"
        color="error"
      />

      <ProfileHero
        v-else-if="profile"
        v-bind="profile"
      />
    </section>

    <!-- TECHNOLOGIES -->
    <section>
      <USkeleton v-if="technologiesPending" class="h-40 w-full" />

      <UAlert
        v-else-if="technologiesError"
        title="Error"
        description="No se pudieron cargar las tecnologías"
        icon="i-lucide-alert-circle"
        color="error"
      />

      <TechnologiesSection
        v-else-if="technologies.length"
        :technologies="technologies"
        flat
      />

      <UEmpty
        v-else
        title="Sin tecnologías"
        description="Aún no hay tecnologías públicas"
        icon="i-lucide-cpu"
      />
    </section>



  </main>
</template>
