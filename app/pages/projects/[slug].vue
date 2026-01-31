<!-- app/pages/projects/[slug].vue -->
<script setup lang="ts" name="ProjectDetailPage">
import { useRoute } from 'vue-router'
import PageLoader from '~/components/common/PageLoader.vue'
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
    <PageLoader v-if="pending" type="skeleton">
      <section class="space-y-12">

        <!-- HERO -->
        <header class="space-y-6">

          <!-- Title -->
          <USkeleton class="h-10 w-3/4" />

          <!-- Excerpt -->
          <USkeleton class="h-6 w-2/3" />

          <!-- Description -->
          <div class="space-y-2 max-w-3xl">
            <USkeleton class="h-4 w-full" />
            <USkeleton class="h-4 w-5/6" />
            <USkeleton class="h-4 w-4/6" />
          </div>

          <!-- Cover image -->
          <USkeleton class="h-72 md:h-96 w-full rounded-lg" />

          <!-- CTA buttons -->
          <div class="flex gap-3 mt-4">
            <USkeleton class="h-10 w-28 rounded-md" />
            <USkeleton class="h-10 w-36 rounded-md" />
          </div>
        </header>

        <!-- TAGS -->
        <div class="flex flex-wrap gap-2">
          <USkeleton v-for="i in 4" :key="i" class="h-6 w-20 rounded-full" />
        </div>

        <!-- TECHNOLOGIES CARD -->
        <UCard variant="soft">
          <template #header>
            <USkeleton class="h-5 w-40" />
          </template>
          <div class="flex flex-wrap gap-2 mt-2">
            <USkeleton v-for="i in 5" :key="i" class="h-6 w-24 rounded-full" />
          </div>
        </UCard>

      </section>
    </PageLoader>


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
