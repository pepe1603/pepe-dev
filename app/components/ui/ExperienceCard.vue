<script setup lang="ts" name="ExperienceCard">
import type { ExperienceListItemView } from '~/composables/public/views/useExperiencesListView';


defineProps<{
  experience: ExperienceListItemView
}>()
</script>

<template>
  <div class="border p-4 rounded-md hover:shadow-md transition">
    <h3 class="text-xl font-semibold">{{ experience.title }}</h3>
    <p class="text-gray-500">{{ experience.subtitle }}</p>
    <p class="text-sm text-gray-400">
      {{ experience.period }} 
      <span v-if="experience.location"> | {{ experience.location }}</span>
    </p>
    <a
      v-if="experience.url"
      :href="experience.url"
      target="_blank"
      class="text-primary hover:underline"
    >
      Ver más
    </a>
  </div>
</template>
