<script setup lang="ts" name="TechnologiesSection">
import type { TechnologyViewModel } from '~/composables/public/views/useTechnologiesView'
import TechnologyBadge from './TechnologyBadge.vue'

defineProps<{
  technologies: TechnologyViewModel[]
  flat?: boolean
}>()

</script>


<template>
  <section class="flex flex-col gap-6 w-full items-center my-6">
    <header class="text-center space-y-2">
      <h2 class="text-3xl font-bold">Stack tecnológico</h2>
      <p class="text-muted">Tecnologías, frameworks y herramientas que utilizo en mis proyectos</p>
    </header>

    <!-- LANDING: Círculo gigante de íconos -->
 <!-- Modo flat: marquee -->
    <div v-if="flat" class="w-full flex justify-center">
      <div class="w-full max-w-5xl">
        <UMarquee
          pause-on-hover
          reverse
          overlay
          :repeat="6"
          :ui="{ 
            root: '[--gap:1rem] w-full',
            content: 'w-auto py-4'
          }"
        >
          <div class="flex flex-wrap gap-2 justify-center">
            <TechnologyBadge
              v-for="tech in technologies"
              :key="tech.id"
              :technology="tech"
              flat
            />
          </div>
        </UMarquee>
      </div>
    </div>

    <!-- ABOUT: Grid simple con ícono + nombre -->
    <div
      v-else
      class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 justify-center"
    >
      <TechnologyBadge
        v-for="tech in technologies"
        :key="tech.id"
        :technology="tech"
      />
    </div>
  </section>
</template>

