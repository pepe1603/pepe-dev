<script setup lang="ts" name="ProjectsSection">
import type { ProjectView } from '~/composables/public/views/useProjectsView'

defineProps<{
  projects: ProjectView[]
}>()
</script>

<template>
  <section class="space-y-10">
    <header class="text-center space-y-2">
      <h2 class="text-3xl font-bold">Proyectos</h2>
      <p class="text-muted">Algunos de los proyectos que he desarrollado</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :project="project"
      />
    </div>
  </section>
</template>
