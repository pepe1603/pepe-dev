<script setup lang="ts" name="ExperienceCard">
import type { ExperienceListItemView } from '~/composables/public/views/useExperiencesListView'

const props = defineProps<{
  experience: ExperienceListItemView
}>()

// estado local del acordeón (independiente por card)
const isAccordionOpen = ref<string | undefined>(undefined)

// id único del acordeón
const accordionId = computed(
  () => `project-${props.experience.id}`
)
</script>

<template>
  <div class="flex flex-col items-stretch">
    <!-- CARD PRINCIPAL (altura fija) -->
    <UCard
      variant="outline"
      class="group hover:shadow-xl transition-all duration-300 w-full hover:border-primary/50 hover:-translate-y-1"
      :ui="{
        root: 'overflow-hidden',
        body: 'p-5 space-y-3'
      }"
    >
      <!-- Gradiente decorativo -->
      <div
        class="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />

      <div class="relative space-y-3">
        <!-- Badge + título -->
        <div class="flex items-start gap-3">
          <UBadge
            :label="experience.type"
            size="sm"
            variant="subtle"
            class="shrink-0 mt-1"
          />
          <h3
            class="text-lg md:text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors"
          >
            {{ experience.title }}
          </h3>
        </div>

        <!-- Subtítulo -->
        <div class="flex items-start gap-2">
          <UIcon
            name="i-lucide-building-2"
            class="size-4 text-gray-400 shrink-0 mt-0.5"
          />
          <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {{ experience.subtitle }}
          </p>
        </div>

        <!-- Periodo + ubicación -->
        <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
          <div class="flex items-center gap-1.5">
            <UIcon name="i-lucide-calendar" class="size-3.5" />
            <span>{{ experience.period }}</span>
          </div>

          <div v-if="experience.location" class="flex items-center gap-1.5">
            <UIcon name="i-lucide-map-pin" class="size-3.5" />
            <span>{{ experience.location }}</span>
          </div>
        </div>

        <!-- Link externo -->
        <a
          v-if="experience.url"
          :href="experience.url"
          target="_blank"
          class="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary-600 transition-colors"
        >
          <span>Ver más detalles</span>
          <UIcon name="i-lucide-external-link" class="size-3.5" />
        </a>
      </div>
    </UCard>

    <!-- ACORDEÓN (FUERA DEL CARD) -->
    <UAccordion
      v-if="experience.project"
      v-model="isAccordionOpen"
      :items="[
        {
          label: 'Proyecto vinculado',
          icon: 'i-lucide-folder-open',
          value: accordionId,
          slot: 'project'
        }
      ]"
      class="mt-2"
      :ui="{
        item: 'border rounded-md overflow-hidden',
        trigger: 'px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors',
        content: 'bg-gray-50/50 dark:bg-gray-800/30'
      }"
    >
      <template #project>
        <NuxtLink
          :to="`/projects/${experience.project.slug}`"
          class="flex items-center gap-4 px-4 py-3 hover:bg-white dark:hover:bg-gray-800 transition-all group/project"
        >
          <!-- Thumbnail -->
          <UAvatar
            :src="experience.project.thumbnail_url || undefined"
            :alt="experience.project.title || undefined"
            size="lg"
            class="ring-2 ring-gray-200 dark:ring-gray-700 group-hover/project:ring-primary transition-all"
          />

          <!-- Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <span
                class="text-sm font-semibold truncate group-hover/project:text-primary transition-colors"
              >
                {{ experience.project.title }}
              </span>
              <UIcon
                name="i-lucide-arrow-right"
                class="size-4 text-primary opacity-0 -translate-x-2 group-hover/project:opacity-100 group-hover/project:translate-x-0 transition-all"
              />
            </div>

            <p
              v-if="experience.project.slug"
              class="text-xs text-gray-600 dark:text-gray-400 line-clamp-2"
            >
              {{ experience.project.slug }}
            </p>
          </div>
        </NuxtLink>
      </template>
    </UAccordion>
  </div>
</template>
