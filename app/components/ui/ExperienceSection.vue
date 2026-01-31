<script setup lang="ts" name="ExperienceSection">
import ExperienceCard from './ExperienceCard.vue';
import type { ExperienceListItemView } from '~/composables/public/views/useExperiencesListView';

defineProps<{
  experiences: ExperienceListItemView[]
}>()
</script>

<template>
  <section class="space-y-10">
    <header class="text-center space-y-2">
      <h2 class="text-3xl font-bold">Experiencia</h2>
      <p class="text-muted">Trayectoria laboral, formación y proyectos relevantes</p>
    </header>

    <div class="container m-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <ExperienceCard
        v-for="exp in experiences"
        :key="exp.id"
        :experience="exp"
      />
    </div>
  </section>
</template>
