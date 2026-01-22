<script setup lang="ts" name="SkillsSection">
import type { SkillCategoryView } from '~/composables/public/views/useSkillsView'
import SkillBadge from './SkillBadge.vue'

const props = defineProps<{
  categories: SkillCategoryView[]
  flat?: boolean // <-- nuevo prop
}>()
</script>

<template>
  <section class="flex flex-col gap-6 w-full items-center">
    <header class="text-center space-y-2">
      <h2 class="text-3xl font-bold">
        Habilidades técnicas
      </h2>
      <p class="text-muted">
        Lenguajes, frameworks y herramientas con las que trabajo
      </p>
    </header>

    <div class="w-full flex justify-center items-center">
      <div class="w-full max-w-7xl">
        <UMarquee
          pause-on-hover
          reverse
          overlay
          :repeat="8"
          :ui="{ 
            root: '[--gap:1rem] w-full',
            content: 'w-auto py-4'
          }"
        >

          <!-- Flat mode: todos los badges juntos -->
          <div v-if="flat" class="flex flex-wrap gap-2 justify-center">
            <SkillBadge
              v-for="skill in categories.flatMap(c => c.skills)"
              :key="skill.id"
              :skill="skill"
            />
          </div>

          <!-- Agrupado por categoría (default) -->
          <template v-else>
            <UPageCard
              v-for="category in categories"
              :key="category.category"
              variant="subtle"
              class="space-y-4 w-fit shrink-0"
            >
              <h3 class="text-xl font-semibold text-center">
                {{ category.category }}
              </h3>

              <div class="flex flex-wrap gap-2 justify-center">
                <SkillBadge
                  v-for="skill in category.skills"
                  :key="skill.id"
                  :skill="skill"
                />
              </div>
            </UPageCard>
          </template>

        </UMarquee>
      </div>
    </div>
  </section>
</template>
