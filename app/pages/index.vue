<!-- app/pages/index.vue -->
<script setup lang="ts" name="LandingPage">
import ProfileHero from '~/components/ui/ProfileHero.vue'
import TechnologiesSection from '~/components/ui/TechnologiesSection.vue'

import { usePublicProfileCase } from '~/composables/public/usecases/usePublicProfileUseCase'
import { usePublicTechnologiesCase } from '~/composables/public/usecases/usePublicTechnologiesUseCase'

import { useHomeSeoUseCase } from '~/composables/public/seo/useHomeSeoUseCase'
import { useSeoHead } from '~/composables/public/seo/useSeoHead'
import PageLoader from '~/components/common/PageLoader.vue'

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
      <PageLoader
        v-if="profilePending"
        type="skeleton"
      >
        <section class="text-center space-y-6">

          <!-- Avatar -->
          <div class="flex justify-center">
            <USkeleton
              class="rounded-full ring-4 ring-primary/10
                    size-16 md:size-48 lg:size-56"
            />
          </div>

          <!-- Name + headline -->
          <div class="space-y-3">
            <USkeleton class="h-10 md:h-14 lg:h-16 w-64 mx-auto" />
            <USkeleton class="h-6 w-80 mx-auto" />
          </div>

          <!-- Bio -->
          <div class="space-y-2 max-w-2xl mx-auto">
            <USkeleton class="h-4 w-full" />
            <USkeleton class="h-4 w-5/6 mx-auto" />
            <USkeleton class="h-4 w-4/6 mx-auto" />
          </div>

          <!-- Meta info -->
          <div class="flex flex-wrap justify-center gap-4 pt-2">
            <USkeleton class="h-4 w-32" />
            <USkeleton class="h-4 w-40" />
          </div>

          <!-- Actions -->
          <div class="flex justify-center gap-3 pt-2">
            <USkeleton class="h-9 w-9 rounded-md" />
            <USkeleton class="h-9 w-9 rounded-md" />
            <USkeleton class="h-9 w-28 rounded-md" />
          </div>

        </section>
      </PageLoader>

      <UAlert
        v-else-if="profileError"
        title="Error"
        description="No se pudo cargar el perfil"
        icon="i-lucide-alert-circle"
        color="error"
      />

        <div v-else-if="profile" class="space-y-6">
          <ProfileHero
            v-bind="profile"
            :fields="['headline','bio','links']"
          />
          
          <div class="flex justify-center">
            <UButton 
              label="Ver más sobre mí" 
              :to="{ name: 'about-me' }" 
              variant="link" 
              color="primary"
              size="lg"
            />
          </div>
        </div>
    </section>

    <!-- TECHNOLOGIES -->
    <section>
      <PageLoader
        v-if="technologiesPending"
        type="skeleton"
        :skeleton-count="2"
      >
        <section class="text-center space-y-6">
          <!-- Title -->
          <div class="space-y-3">
            <USkeleton class="h-10 md:h-14 lg:h-16 w-64 mx-auto" />
            <USkeleton class="h-6 w-80 mx-auto" />
          </div>
          <!-- sStack -->
          <div class="flex justify-center">
            <USkeleton
              class="rounded-full 
                    size-36 md:size-52 lg:size-125"
            />
          </div>

          
        </section>
      </PageLoader>

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
