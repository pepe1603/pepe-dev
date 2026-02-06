<script setup lang="ts" name="SkillsSection">
import type { SkillCategoryView } from '~/composables/public/views/useSkillsView'
import SkillItem from './SkillItem.vue';


defineProps<{
  categories: SkillCategoryView[]
}>()
</script>

<template>
  <section class="flex flex-col gap-10 w-full">
    <header class="text-center space-y-2">
      <h2 class="text-3xl font-bold">
        Habilidades profesionales
      </h2>
      <p class="text-muted max-w-2xl mx-auto">
        Competencias técnicas y transversales que aplico en el desarrollo de software
      </p>
    </header>

    <!-- Categorías -->
    <div class="space-y-10 w-full max-w-6xl mx-auto">
      <section
        v-for="category in categories"
        :key="category.category"
        class="space-y-4 border-t border-muted/40 pt-6"
      >
        <h3 class="text-lg font-semibold text-muted-foreground">
          {{ category.category }}
        </h3>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
          <SkillItem
            v-for="skill in category.skills"
            :key="skill.id"
            :skill="skill"
            class="w-full max-w-55"
          />
        </div>
      </section>
    </div>
  </section>
</template>
