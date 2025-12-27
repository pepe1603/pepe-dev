<!-- app/pages/index.vue -->
<script setup lang="ts" name="LandingPage">
import ProfileHero from '~/components/ui/ProfileHero.vue'
import SkillsSection from '~/components/ui/SkillsSection.vue'

import { usePublicProfileCase } from '~/composables/public/usecases/usePublicProfileUseCase'
import { usePublicSkillsCase } from '~/composables/public/usecases/usePublicSkillsUseCase'

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
  data: skills,
  pending: skillsPending,
  error: skillsError,
} = usePublicSkillsCase()
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

    <!-- SKILLS -->
    <section>
      <USkeleton
        v-if="skillsPending"
        class="h-40 w-full"
      />

      <UAlert
        v-else-if="skillsError"
        title="Error"
        description="No se pudieron cargar las habilidades"
        icon="i-lucide-alert-circle"
        color="error"
      />

      <SkillsSection
        v-else-if="skills.length"
        :categories="skills"
      />

      <UEmpty
        v-else
        title="Sin habilidades"
        description="Aún no hay habilidades públicas"
        icon="i-lucide-code"
      />
    </section>

  </main>
</template>
