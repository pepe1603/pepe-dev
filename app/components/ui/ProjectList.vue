    <!-- app/components/ui/ProjectList.vue -->
<script setup lang="ts" name="ProjectList">
import type { ProjectView } from '~/composables/public/views/useProjectsView'
import { NuxtLink } from '#components'

const props = defineProps<{
  projects: ProjectView[]
}>()
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 py-8 md:py-16">
    <!-- Header con storytelling -->
    <header class="text-center mb-16 md:mb-24">
      <UBadge 
        label="Mi evolución técnica" 
        variant="soft" 
        class="mb-6 mx-auto"
        icon="i-lucide-history"
      />
      <h1 class="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary">
        De líneas de código a historias digitales
      </h1>
      <p class="text-lg text-muted-foreground max-w-3xl mx-auto">
        Cada proyecto es un capítulo. Aquí está mi viaje cronológico: errores, aprendizajes y el camino hacia la simplicidad intencional.
      </p>
    </header>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4 py-8">
    <div 
      v-for="(project, index) in props.projects" 
      :key="project.id"
      class="group relative rounded-2xl overflow-hidden border border-accented/10 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/10"
      data-project-card
      style="animation-delay: calc(0.1s * var(--index));"
      :style="`--index: ${index}`"
    >
      <NuxtLink :to="`/projects/${project.slug}`" class="block">
        <!-- Imagen con overlay y efecto hover -->
        <div class="relative aspect-video overflow-hidden">
          <img
            :src="project.thumbnail"
            :alt="project.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-linear-to-t from-black/30 to-transparent pointer-events-none"></div>
        </div>

        <!-- Contenido -->
        <div class="p-6">
          <div class="flex justify-between items-start mb-3">
            <h3 class="text-xl font-bold transition-colors group-hover:text-primary">
              {{ project.title }}
            </h3>
            <span 
              v-if="project.publishedAt"
              class="text-sm font-medium px-3 py-1 rounded-full bg-primary/5 text-primary"
            >
              {{ project.publishedAt }}
            </span>
          </div>

          <p class="text-muted-foreground mb-4 line-clamp-3">
            {{ project.excerpt }}
          </p>

          <div class="flex items-center justify-between pt-4 border-t border-accented/10">
            <span class="text-sm text-primary font-medium flex items-center group-hover:translate-x-1 transition-transform">
              Explorar proyecto
              <UIcon name="i-lucide-arrow-up-right" class="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
            <UIcon name="i-lucide-chevron-right" class="w-5 h-5 text-muted-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>



<!-- CTA FINAL REVISADO -->
<div class="mt-24 text-center max-w-3xl mx-auto">
  <div class="inline-block mb-8">
    <div class="w-24 h-1 bg-linear-to-r from-primary to-secondary mx-auto rounded-full"></div>
  </div>
  <h2 class="text-3xl font-bold mb-6">¿Quieres ver todo lo que hago?</h2>
  <p class="text-lg text-muted-foreground mb-8">
    Estos proyectos son solo una parte de mi viaje como desarrollador. 
    Si quieres conocer más sobre mí, mi forma de trabajar y cómo puedes contactarme, 
    échale un vistazo a mi perfil completo.
  </p>
  <UButton 
    to="/about-me" 
    size="xl" 
    variant="solid"
    icon="i-lucide-user"
    trailing
    class="group hover:shadow-lg transition-shadow"
  >
    Ir a mi perfil
    <span class="group-hover:translate-x-1 transition-transform">→</span>
  </UButton>
</div>

  </section>
</template>
<style scoped>
/* Animación de entrada fade + slide */
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

[data-project-card] {
  opacity: 0;
  animation: fadeSlideUp 0.5s ease forwards;
}

/* Stagger animation usando CSS variable */
[data-project-card] {
  animation-delay: calc(var(--index) * 0.1s);
}
</style>
