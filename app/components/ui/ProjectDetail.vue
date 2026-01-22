<script setup lang="ts" name="ProjectDetail">
import type { ProjectDetailView } from '~/composables/public/views/useProjectDetailView'

defineProps<{
  project: ProjectDetailView
}>()
</script>

<template>
  <section class="space-y-12">

    <!-- HERO -->
    <header class="space-y-6">
      <h1 class="text-4xl md:text-5xl font-bold tracking-tight">
        {{ project.title }}
      </h1>

      <p v-if="project.excerpt" class="text-xl text-muted max-w-3xl">
        {{ project.excerpt }}
      </p>


      <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
        {{ project.description }}
      </p>

      <!-- Cover image / hero -->
      <div class="relative rounded-lg overflow-hidden border border-accented bg-muted">
        <UBadge v-if="project.featured" color="primary" variant="soft" class="absolute top-3 right-3 z-10">
          ⭐ Destacado
        </UBadge>

        <img
          :src="project.cover.src"
          :alt="project.cover.alt || project.title"
          class="w-full h-72 md:h-96 object-cover"
          loading="lazy"
        />
        <p v-if="project.publishedAt" class="text-xs text-gray-400 absolute italic bottom-2 right-3 z-10 hover:backdrop-blur-xs py-0.5 px-1  rounded-2xl">
          Publicado {{ new Date(project.publishedAt).toLocaleDateString() }}
        </p>

      </div>

      <!-- ACTIONS CTA -->
      <div class="flex flex-wrap gap-3 mt-4">
        <UButton
          v-if="project.demoUrl"
          :to="project.demoUrl"
          target="_blank"
          icon="i-lucide-play"
          color="primary"
        >
          Live demo
        </UButton>

        <UButton
          v-if="project.repoUrl"
          :to="project.repoUrl"
          target="_blank"
          variant="outline"
          icon="i-lucide-github"
        >
          View repository
        </UButton>
      </div>
    </header>

    <!-- TAGS -->
    <div v-if="project.tags.length" class="flex flex-wrap gap-2">
      <UBadge
        v-for="tag in project.tags"
        :key="tag"
        variant="soft"
        icon="i-lucide-tag"
        color="neutral"
      >
        {{ tag }}
      </UBadge>
    </div>

    <!-- TECHNOLOGIES -->
    <UCard v-if="project.technologies.length" variant="soft">
      <template #header>
        <h2 class="font-semibold text-lg">Technologies used</h2>
      </template>
      <div class="flex flex-wrap gap-2 mt-2">
        <UBadge
          v-for="tech in project.technologies"
          :key="tech.id"
          variant="soft"
          :color="tech.color ?? 'neutral'"
        >
          {{ tech.name }}
        </UBadge>
      </div>
    </UCard>

    <!-- GALLERY -->
    <section v-if="project.gallery.length" class="space-y-4">
      <h2 class="text-2xl font-semibold">Project gallery</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <UCard
          v-for="img in project.gallery"
          :key="img.id"
          class="overflow-hidden rounded-lg"
        >
          <img
            :src="img.src"
            :alt="img.alt || project.title"
            class="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </UCard>
      </div>
    </section>

  </section>
</template>
