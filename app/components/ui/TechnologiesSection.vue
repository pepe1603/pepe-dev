<script setup lang="ts" name="TechnologiesSection">
import type { TechnologyViewModel } from '~/composables/public/views/useTechnologiesView'
import TechnologyItem from './TechnologyItem.vue'

defineProps<{
  technologies: TechnologyViewModel[]
  flat?: boolean
}>()
</script>

<template>
  <section class="flex flex-col gap-8 w-full items-center my-6">
    <header class="text-center space-y-2">
      <h2 class="text-3xl font-bold">Stack tecnológico</h2>
      <p class="text-muted max-w-2xl">
        Tecnologías, frameworks y herramientas que utilizo en mis proyectos
      </p>
    </header>

    <!-- LANDING -->
    <div v-if="flat" class="w-full max-w-5xl">
      <UMarquee pause-on-hover :repeat="6">
        <div class="flex gap-6 justify-center py-4">
          <TechnologyItem
            v-for="tech in technologies"
            :key="tech.id"
            :technology="tech"
            compact
          />
        </div>
      </UMarquee>
    </div>

    <!-- ABOUT -->
    <div
      v-else
      class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8"
    >
      <TechnologyItem
        v-for="tech in technologies"
        :key="tech.id"
        :technology="tech"
      />
    </div>
  </section>
</template>
