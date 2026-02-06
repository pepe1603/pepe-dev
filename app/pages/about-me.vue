<script setup lang="ts" name="AboutMePage">
import ProfileHero from '~/components/ui/ProfileHero.vue'
import ExperienceSection from '~/components/ui/ExperienceSection.vue'

import { usePublicProfileCase } from '~/composables/public/usecases/usePublicProfileUseCase'
import { usePublicExperiencesUseCase } from '~/composables/public/usecases/usePublicExperiencesUseCase'
import { useAboutSeoUseCase } from '~/composables/public/seo/useAboutSeoUseCase'
import { useSeoHead } from '~/composables/public/seo/useSeoHead'
import { usePublicSkillsCase } from '~/composables/public/usecases/usePublicSkillsUseCase'
import SkillsSection from '~/components/ui/SkillsSection.vue'
import TechnologiesSection from '~/components/ui/TechnologiesSection.vue'
import { usePublicTechnologiesCase } from '~/composables/public/usecases/usePublicTechnologiesUseCase'
import PageLoader from '~/components/common/PageLoader.vue'


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

//skilss
const {
  data: skillCategories,
  pending,
  error: skillsError
} = usePublicSkillsCase()

// Technologies
const {
  data: technologies,
  pending: technologiesPending,
  error: technologiesError
} = usePublicTechnologiesCase()

</script>

<template>
  <main class="space-y-24">

    <!-- HERO -->
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

      <ProfileHero
        v-else-if="profile"
        v-bind="profile"
        :fields="['headline','bio','location','email','links','cv']"
      />

    </section>

    <!-- skill -->
    <section>
      <div class="space-y-16">
        <!-- otras secciones del about -->

        <SkillsSection
          v-if="!pending && skillCategories.length"
          :categories="skillCategories"
        />

        <PageLoader
        v-else-if="pending"
        type="skeleton"
        message="Cargando habilidades..."
        >
        <section class="flex flex-col gap-6 w-full items-center">
          <header class="text-center space-y-2">
            <USkeleton class="h-10 md:h-14 lg:h-16 w-64 mx-auto" />
            <USkeleton class="h-4 w-5/6 mx-auto" />
          </header>

          <div class="w-full flex justify-center items-center">
            <div class="w-full max-w-7xl">
              <UMarquee
                pause-on-hover
                reverse
                overlay
                :repeat="8"
                :ui="{ 
                  root: '[--gap:1rem] w-full',
                  content: 'w-auto py-4'
                }"
              >

                <!-- Agrupado por categoría (default) -->
                  <UPageCard
                    v-for=" i in 4"
                    :key="i"
                    variant="soft"
                    class="space-y-4 w-fit shrink-0"
                  >
                    <USkeleton class="h-4 w-5/6 mx-auto" />

                    <div class="flex flex-wrap gap-2 justify-center">
                      <USkeleton
                        v-for="skill in 2"
                        :key="skill"
                        class="h-5 w-16 mx-auto"
                      />
                    </div>
                  </UPageCard>
              </UMarquee>
            </div>
          </div>
        </section>

        </PageLoader>
        
        <UAlert
          v-else-if="skillsError"
          title="Error"
          description="No se pudieron cargar las skill"
          icon="i-lucide-alert-circle"
          color="error"
        />

        <UEmpty
          v-else
          class="text-center text-muted"
          title="Sin habilidades aún."
          description="No hay habilidades publicadas."
          icon="i-lucide-start"
        />
      </div>
    </section>

    <!-- TECHNOLOGIES -->
    <section>
      <PageLoader
        v-if="technologiesPending"
        type="skeleton"
        message="Cargando tecnologias..."
       >
      <section class="flex flex-col gap-6 w-full items-center">
          <header class="text-center space-y-2">
            <USkeleton class="h-10 md:h-14 lg:h-16 w-64 mx-auto" />
            <USkeleton class="h-4 w-5/6 mx-auto" />
          </header>

          <div class="w-full flex justify-center items-center">
            <div class="flex items-center justify-center gap-6">
              <USkeleton
                v-for="tech in 8"
                :key="tech"
                class="cursor-pointer size-20 p-3 rounded-full"
              />
            </div>
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
      />

      <UEmpty
        v-else
        title="Sin tecnologías"
        description="Aún no hay tecnologías públicas"
        icon="i-lucide-cpu"
      />
    </section>




    <!-- EXPERIENCIAS -->
    <section>
      <PageLoader
        v-if="experiencesPending"
        type="skeleton"
        message="Cargando experiencias..."
        >
        <section class="flex flex-col gap-6 w-full items-center">
          <header class="text-center space-y-2">
            <USkeleton class="h-4 w-64 mx-auto" />
            <USkeleton class="h-2 w-5/6 mx-auto" />
          </header>

          <div class="container m-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start">
            <UCard
                v-for="exp in 5"
                :key="exp"
                class="p-5 space-y-3"
              >
              <div class="flex items-start gap-2">
                <USkeleton class="rounded-full size-10 ring-1 ring-muted "/>
                <USkeleton class="h-4 w-5/6 mx-auto" />
                
              </div>
            </UCard>
          </div>
        </section>
      </PageLoader>

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
