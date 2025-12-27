<!-- app/components/ui/ProjectDetail.vue -->
<script setup lang="ts" name="ProjectDetail">
import type { ProjectDetailView } from '~/composables/public/views/useProjectDetailView'

defineProps<{
  project: ProjectDetailView
}>()
</script>

<template>
  <section class="space-y-6">
    <h1 class="text-4xl font-bold">{{ project.title }}</h1>

    <p class="text-muted">
      {{ project.description }}
    </p>

    <div v-if="project.tags.length" class="flex flex-wrap gap-2">
      <span
        v-for="tag in project.tags"
        :key="tag"
        class="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm"
      >
        {{ tag }}
      </span>
    </div>

    <div v-if="project.technologies.length" class="flex flex-wrap gap-2 mt-4">
      <span
        v-for="tech in project.technologies"
        :key="tech.id"
        class="px-2 py-1 text-sm rounded"
        :class="`bg-${tech.color ?? 'gray'}-100 text-${tech.color ?? 'gray'}-700`"
      >
        {{ tech.name }}
      </span>
    </div>

    <div v-if="project.demoUrl || project.repoUrl" class="flex gap-4 mt-4">
      <UButton
        v-if="project.demoUrl"
        :to="project.demoUrl"
        target="_blank"
        icon="i-lucide-play"
      >
        Ver demo
      </UButton>

      <UButton
        v-if="project.repoUrl"
        :to="project.repoUrl"
        target="_blank"
        variant="outline"
        icon="i-lucide-github"
      >
        Ver repo
      </UButton>
    </div>

    <div
      v-if="project.gallery.length"
      class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
    >
      <img
        v-for="img in project.gallery"
        :key="img.id"
        :src="img.src"
        :alt="img.alt"
        class="rounded-md object-cover w-full h-64"
      />
    </div>
  </section>
</template>
