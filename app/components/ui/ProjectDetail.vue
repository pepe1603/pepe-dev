<script setup lang="ts" name="ProjectDetail">
import type { ProjectDetailView } from '~/composables/public/views/useProjectDetailView'
import PublicMediaRenderer from './media/PublicMediaRenderer.vue';

defineProps<{
  project: ProjectDetailView
}>()
</script>

<template>
  <section class="space-y-12">

    <!-- HERO -->
    <header class="space-y-4 p-2">

      <div class="space-y-5">
        <h1 class="text-3xl md:text-5xl text-primary-500 dark:text-primary-400 font-bold mb-6 tracking-tight">
          {{ project.title }}
        </h1>
          <p v-if="project.excerpt" class="text-base sm:text-xl font-semibold">
            {{ project.excerpt }}
          </p>
        <div class="p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
          <p class="text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300 mb-1 whitespace-pre-line ">
            {{ project.description }}
          </p>
        </div>
      </div>

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
        <p v-if="project.publishedAt" class="text-xs text-gray-400 absolute italic bottom-2 right-3 z-10 hover:backdrop-blur-xs py-0.5 px-1 rounded-2xl">
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
    <UCard v-if="project.technologies.length" variant="outline">
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


    <!-- MEDIA -->
    <PublicMediaRenderer
      v-if="project.media.length"
      :media="project.media"
    />
  </section>
</template>
