<!-- SkillItem.vue -->
<script setup lang="ts" name="SkillItem">
import type { SkillViewModel } from '~/composables/public/views/useSkillsView'

const props = defineProps<{ skill: SkillViewModel }>()

const levelMap = {
  basic: 1,
  intermediate: 2,
  advanced: 3,
  expert: 4,
} as const

const levelValue = levelMap[props.skill.level]
</script>

<template>
  <div
    class="flex items-center justify-between gap-4
           rounded-lg px-4 py-2
           bg-muted/40
           hover:bg-muted/60
           transition-colors"
    :aria-label="`${skill.name} - nivel ${skill.level}`"
  >
    <span class="font-medium text-sm">
      {{ skill.name }}
    </span>

    <div class="flex gap-1">
      <span
        v-for="i in 4"
        :key="i"
        class="h-2 w-2 rounded-full transition-colors"
        :class="i <= levelValue
          ? 'bg-primary'
          : 'bg-secondary'"
      />
    </div>
  </div>
</template>
