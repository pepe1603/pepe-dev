<!-- app/pages/projects/[slug].vue -->
<script setup lang="ts" name="ProjectDetailPage">
import { useRoute } from 'vue-router'
import ProjectDetail from '~/components/ui/ProjectDetail.vue'
import { useProjectDetailSeoUseCase } from '~/composables/public/seo/useProjectDetailSeoUseCase'
import { useSeoHead } from '~/composables/public/seo/useSeoHead'
import { usePublicProjectDetailUseCase } from '~/composables/public/usecases/usePublicProjectDetailUseCase'

definePageMeta({
  title: 'Proyecto',
  name: 'project-slug',
})

const route = useRoute()
const slug = route.params.slug as string

const { data: project, pending, error } =
  usePublicProjectDetailUseCase(slug)

const seo = useProjectDetailSeoUseCase(project, slug)
useSeoHead(seo)
</script>

<template>
  <article class="max-w-6xl mx-auto px-4 py-10">
    <USkeleton v-if="pending" class="h-72 w-full rounded-xl" />

    <UAlert
      v-else-if="error"
      title="Proyecto no encontrado"
      description="Este proyecto no existe o no es público"
      icon="i-lucide-alert-circle"
      color="error"
    />

    <ProjectDetail
      v-else-if="project"
      :project="project"
    />

    <UEmpty
      v-else
      title="Proyecto no disponible"
      icon="i-lucide-alert-triangle"
    />
  </article>
</template>
