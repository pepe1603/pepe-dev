<script setup lang="ts" name="ProjectList">
import type { useProjectsUseCase } from '~/composables/public/usecases/usePublicProjectsUseCase';


defineProps<{
  projects: ReturnType<typeof useProjectsUseCase>
}>()
</script>

<template>
  <section class="space-y-10">
    <header class="text-center space-y-2">
      <h2 class="text-3xl font-bold">Proyectos</h2>
      <p class="text-muted">Proyectos destacados y recientes que he desarrollado</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="project in projects" :key="project.id" class="border rounded-lg p-4 hover:shadow-lg transition">
        <img
          :src="project.thumbnail"
          :alt="project.title"
          class="w-full h-48 object-cover rounded-md mb-4"
        />
        <h3 class="text-xl font-semibold">{{ project.title }}</h3>
        <p class="text-muted">{{ project.excerpt }}</p>
        <p v-if="project.publishedAt" class="text-sm text-gray-400 mt-1">Publicado: {{ project.publishedAt }}</p>
      </div>
    </div>
  </section>
</template>
