<script setup lang="ts" name="SkillBadge">
import type { SkillViewModel } from '~/composables/public/views/useSkillsView'

defineProps<{
  skill: SkillViewModel
}>()
</script>

<template>
  <UBadge
    :color="skill.levelColor"
    variant="subtle"
    size="lg"
  >
    {{ skill.name }}
  </UBadge>
</template>

