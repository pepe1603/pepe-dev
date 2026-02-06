<script setup lang="ts" name="TechnologyItem">
import type { TechnologyViewModel } from '~/composables/public/views/useTechnologiesView'

defineProps<{
  technology: TechnologyViewModel
  compact?: boolean
}>()
</script>

<template>
  <component
    :is="technology.websiteUrl ? 'a' : 'div'"
    :href="technology.websiteUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="
      group flex flex-col items-center justify-center gap-2
      transition-transform
      hover:scale-105
    "
  >
    <div
      class="
        flex items-center justify-center
        rounded-full
        bg-muted/40
        group-hover:bg-muted/60
        transition-colors
      "
      :class="compact ? 'size-14' : 'size-20'"
    >
      <img
        v-if="technology.icon"
        :src="technology.icon"
        :alt="technology.name"
        class="size-10 object-contain"
      />
    </div>

    <span
      v-if="!compact"
      class="text-sm text-center text-muted-foreground"
    >
      {{ technology.name }}
    </span>
  </component>
</template>
