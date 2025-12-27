<script setup lang="ts" name="SkillsSection">
import type { SkillCategoryView } from '~/composables/public/views/useSkillsView'

defineProps<{
  categories: SkillCategoryView[]
}>()
</script>

<template>
  <section class="space-y-10">
    <header class="text-center space-y-2">
      <h2 class="text-3xl font-bold">
        Habilidades & Tecnologías
      </h2>
      <p class="text-muted">
        Tecnologías que utilizo en mis proyectos
      </p>
    </header>

    <div
      v-for="category in categories"
      :key="category.category"
      class="space-y-4"
    >
      <h3 class="text-xl font-semibold">
        {{ category.category }}
      </h3>

      <div class="flex flex-wrap gap-2">
        <UBadge
          v-for="skill in category.skills"
          :key="skill.id"
          :color="skill.levelColor"
          variant="subtle"
          size="lg"
        >
          {{ skill.name }}
        </UBadge>
      </div>
    </div>
  </section>
</template>
