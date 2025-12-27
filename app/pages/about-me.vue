<script setup lang="ts" name="AboutMePage">
import ProfileHero from '~/components/ui/ProfileHero.vue'
import ExperienceSection from '~/components/ui/ExperienceSection.vue'

import { usePublicProfileCase } from '~/composables/public/usecases/usePublicProfileUseCase'
import { usePublicExperiencesUseCase } from '~/composables/public/usecases/usePublicExperiencesUseCase'
import { useAboutSeoUseCase } from '~/composables/public/seo/useAboutSeoUseCase'
import { useSeoHead } from '~/composables/public/seo/useSeoHead'

definePageMeta({
  name: 'about-me',
  title: 'Sobre mí',
})

const seo = useAboutSeoUseCase()

useSeoHead(seo)


// Perfil
const { data: profile, pending: profilePending, error: profileError } = usePublicProfileCase()

// Experiencias
const { data: experiences, pending: experiencesPending, error: experiencesError } = usePublicExperiencesUseCase()
</script>

<template>
  <main class="space-y-24">

    <!-- HERO -->
    <section>
      <USkeleton v-if="profilePending" class="h-64 w-full" />
      
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

    <!-- EXPERIENCIAS -->
    <section>
      <USkeleton v-if="experiencesPending" class="h-32 w-full" />

      <UAlert
        v-else-if="experiencesError"
        title="Error"
        description="No se pudo cargar la experiencia"
        icon="i-lucide-alert-circle"
        color="error"
      />

      <ExperienceSection
        v-else-if="experiences.length"
        :experiences="experiences"
      />

      <UEmpty
        v-else
        title="Sin experiencia aún"
        description="Aún no hay experiencias públicas"
        icon="i-lucide-backpack"
      />
    </section>

  </main>
</template>
