<script setup lang="ts" name="ProjectCard">
import type { ProjectView } from '~/composables/public/views/useProjectsView'

defineProps<{
  project: ProjectView
}>()
</script>

<template>
  <div class="border rounded-md p-4 hover:shadow-md transition">
    <img
      :src="project.thumbnail"
      :alt="project.title"
      class="w-full h-48 object-cover rounded-md mb-3"
    />
    <h3 class="text-xl font-semibold">{{ project.title }}</h3>
    <p class="text-gray-500">{{ project.excerpt }}</p>
    <p class="text-sm text-gray-400">
      <span v-if="project.publishedAt">Publicado: {{ project.publishedAt }}</span>
      <span v-if="project.featured"> | Destacado</span>
    </p>
    <NuxtLink
      :to="`/projects/${project.slug}`"
      class="text-primary hover:underline mt-2 inline-block"
    >
      Ver proyecto
    </NuxtLink>
  </div>
</template>
