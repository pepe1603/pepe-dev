<script setup lang="ts" name="TechnologiesSection">
import type { TechnologyViewModel } from '~/composables/public/views/useTechnologiesView'
import TechnologyBadge from './TechnologyBadge.vue'

defineProps<{
  technologies: TechnologyViewModel[]
  flat?: boolean
}>()

/**
 * Calcula la posición circular para cada ícono
 * @param index número del ícono
 * @param total total de íconos
 * @param radius radio del círculo
 */
function getCirclePosition(index: number, total: number, radius: number) {
  const angle = (index / total) * 2 * Math.PI
  const x = +(Math.cos(angle) * radius).toFixed(2)
  const y = +(Math.sin(angle) * radius).toFixed(2)
  return {
    transform: `translate(${x}px, ${y}px)`,
    transition: 'transform 0.5s'
  }
}

</script>


<template>
  <section class="flex flex-col gap-6 w-full items-center">
    <header class="text-center space-y-2">
      <h2 class="text-3xl font-bold">Stack tecnológico</h2>
      <p class="text-muted">Tecnologías, frameworks y herramientas que utilizo en mis proyectos</p>
    </header>

    <!-- LANDING: Círculo gigante de íconos -->
    <div
      v-if="flat"
      class="relative w-125 h-125 flex items-center justify-center rounded-full border border-dashed border-muted overflow-hidden"
    >
      <div
        v-for="(tech, index) in technologies"
        :key="tech.id"
        class="absolute"
        :style="getCirclePosition(index, technologies.length, 200)"
      >
        <TechnologyBadge :technology="tech" flat />
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

