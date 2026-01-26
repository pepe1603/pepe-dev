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
        :fields="['headline','bio','location','email','links','cv']"
      />

    </section>

    <!-- skill -->
    <section>
      <div class="space-y-16">
        <!-- otras secciones del about -->

        <SkillsSection
          v-if="skillCategories.length"
          :categories="skillCategories"
        />

        <USkeleton
          v-else-if="pending"
          class="text-center text-muted"
        >
          Cargando habilidades…
        </USkeleton>
        
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
      <USkeleton
        v-if="technologiesPending"
        class="h-40 w-full"
      />

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
