<!-- app/pages/projects/index.vue -->
<script setup lang="ts" name="ProjectsPage">
import PageLoader from '~/components/common/PageLoader.vue'
import ProjectList from '~/components/ui/ProjectList.vue'
import { useProjectsSeoUseCase } from '~/composables/public/seo/useProjectsSeoUseCase'
import { useSeoHead } from '~/composables/public/seo/useSeoHead'
import { usePublicProjectsCase } from '~/composables/public/usecases/usePublicProjectsUseCase'

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
    <PageLoader
      v-if="pending"
      type="skeleton"
      :skeleton-count="4"
      >

    <!-- Skeleton estilo ProjectList -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4 py-8">
        <div v-for="n in 4" :key="n" class="rounded-2xl overflow-hidden border border-accented/10 shadow-sm animate-pulse">
          
          <!-- Imagen placeholder -->
          <USkeleton class="relative aspect-video bg-muted" />

          <!-- Contenido placeholder -->
          <USkeleton class="p-6 space-y-4">
            <!-- Título -->
            <USkeleton class="h-5 w-3/4 bg-muted rounded" />
            <!-- Fecha -->
            <USkeleton class="h-4 w-20 bg-muted rounded" />
            <!-- Extracto -->
            <USkeleton class="space-y-2">
              <USkeleton class="h-3 w-full bg-muted rounded" />
              <USkeleton class="h-3 w-5/6 bg-muted rounded" />
            </USkeleton>
            <!-- CTA -->
            <USkeleton class="h-4 w-1/2 bg-muted rounded mt-4" />
          </USkeleton>

        </div>
      </div>
        
    </PageLoader>

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
