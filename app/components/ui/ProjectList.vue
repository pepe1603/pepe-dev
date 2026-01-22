<script setup lang="ts" name="ProjectList">
import type { ProjectView } from '~/composables/public/views/useProjectsView'
import { NuxtLink } from '#components'

defineProps<{
  projects: ProjectView[]
}>()
</script>

<template>
  <section class="space-y-10">
    <!-- Header -->
    <header class="text-center space-y-2">
      <h2 class="text-3xl font-bold">Proyectos</h2>
      <p class="text-muted">Proyectos destacados y recientes que he desarrollado</p>
    </header>

    <!-- Grid de proyectos -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <NuxtLink
        v-for="project in projects"
        :key="project.id"
        :to="`/projects/${project.slug}`"
        class="relative group border border-accented rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-transform duration-300 ease-in-out hover:scale-105"
      >
        <!-- Badge Destacado -->
        <UBadge
          v-if="project.featured"
          class="absolute top-2 left-2 z-10 text-xs"
          color="primary"
          variant="soft"
        >
          ⭐ Destacado
        </UBadge>

        <!-- Imagen -->
        <img
          :src="project.thumbnail"
          :alt="project.title"
          class="w-full aspect-video object-cover"
          loading="lazy"
        />

        <!-- Contenido -->
        <div class="p-4 bg-white dark:bg-gray-900">
          <h3 class="text-xl font-semibold mb-2">{{ project.title }}</h3>
          <p class="text-gray-600 dark:text-gray-300 line-clamp-3">{{ project.excerpt }}</p>
          <p v-if="project.publishedAt" class="text-sm text-gray-400 mt-2">
            Publicado: {{ project.publishedAt }}
          </p>
        </div>

        <!-- Overlay al hover -->
        <div
          class="absolute inset-0 backdrop-blur-xs bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white font-bold text-lg"
        >
          Ver proyecto
        </div>
      </NuxtLink>
    </div>

    <!-- Skeleton loader si aún no hay proyectos cargados -->
    <div v-if="projects.length === 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="n in 6" :key="n" class="animate-pulse rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 aspect-video"></div>
    </div>
  </section>
</template>
