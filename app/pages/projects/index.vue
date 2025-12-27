<!-- app/pages/projects/index.vue -->
<script setup lang="ts" name="ProjectsPage">
import ProjectList from '~/components/ui/ProjectList.vue'
import { useProjectsSeoUseCase } from '~/composables/public/seo/useProjectsSeoUseCase'
import { useSeoHead } from '~/composables/public/seo/useSeoHead'
import { usePublicProjectsCase } from '~/composables/public/usecases/usePublicProjectsUseCase' //error: Module '"~/composables/public/usecases/usePublicProjectsUseCase"' has no exported member 'usePublicProjectsCase'. 

definePageMeta({
  title: 'Proyectos',
  name: 'projects',
})

const seo = useProjectsSeoUseCase()

useSeoHead(seo)

const {
  data: projects,
  pending,
  error,
} = usePublicProjectsCase()
</script>

<template>
  <section class="space-y-10">
    <header>
      <h1 class="text-3xl font-semibold">Proyectos</h1>
    </header>

    <USkeleton
      v-if="pending"
      class="h-40 w-full"
    />

    <UAlert
      v-else-if="error"
      title="Error"
      description="No se pudieron cargar los proyectos"
      icon="i-lucide-alert-circle"
      color="error"
    />

    <ProjectList
      v-else-if="projects.length"
      :projects="projects"
    />

    <UEmpty
      v-else
      title="Sin proyectos"
      description="Aún no hay proyectos publicados"
      icon="i-lucide-folder"
    />
  </section>
</template>
