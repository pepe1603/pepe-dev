<script setup lang="ts" name="ExperienceSection">
import ExperienceCard from './ExperienceCard.vue';
import type { ExperienceListItemView } from '~/composables/public/views/useExperiencesListView';

defineProps<{
  experiences: ExperienceListItemView[] // <-- arreglo, no objeto
}>()
</script>

<template>
  <section class="space-y-10">
    <header class="text-center space-y-2">
      <h2 class="text-3xl font-bold">Experiencia</h2>
      <p class="text-muted">Mi recorrido profesional y proyectos anteriores</p>
    </header>

    <div class="space-y-6">
      <ExperienceCard
        v-for="exp in experiences"
        :key="exp.id"
        :experience="exp"
      />
    </div>
  </section>
</template>
