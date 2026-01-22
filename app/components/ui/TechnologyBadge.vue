<script setup lang="ts" name="TechnologyBadge">
import type { TechnologyViewModel } from '~/composables/public/views/useTechnologiesView'

const props = defineProps<{
  technology: TechnologyViewModel
  flat?: boolean
}>()

const TOKEN_COLORS = [
  'neutral',
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'error'
] as const

type TokenColor = typeof TOKEN_COLORS[number]

const badgeColor = computed<TokenColor>(() => {
  return TOKEN_COLORS.includes(props.technology.color as TokenColor)
    ? (props.technology.color as TokenColor)
    : 'neutral'
})
</script>

<template>
  <UTooltip v-if="technology.description" :text="technology.description">
    <UBadge
      :color="badgeColor"
      variant="outline"
      size="lg"
      class="cursor-pointer flex flex-col items-center justify-center p-3 rounded-full"
    >
      <a
        v-if="technology.websiteUrl"
        :href="technology.websiteUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex flex-col items-center gap-1"
      >
        <UAvatar
          v-if="props.flat"
          size="3xl"
          :src="technology.icon"
          alt=""
          rounded
        />
        <img
          v-else-if="technology.icon"
          :src="technology.icon"
          alt=""
          class="size-12"
        />
        <span v-if="!props.flat" class="text-sm mt-1 text-center">{{ technology.name }}</span>
      </a>

      <span v-else class="flex flex-col items-center gap-1">
        <UAvatar
          v-if="props.flat"
          size="lg"
          :src="technology.icon"
          alt=""
          rounded
        />
        <img
          v-else-if="technology.icon"
          :src="technology.icon"
          alt=""
          class="size-12"
        />
        <span v-if="!props.flat" class="text-sm mt-1 text-center">{{ technology.name }}</span>
      </span>
    </UBadge>
  </UTooltip>

  <UBadge v-else :color="badgeColor" variant="subtle" size="lg" class="cursor-pointer flex flex-col items-center justify-center p-3 rounded-full">
    <a
      v-if="technology.websiteUrl"
      :href="technology.websiteUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex flex-col items-center gap-1"
    >
      <UAvatar
        v-if="props.flat"
        size="3xl"
        :src="technology.icon"
        alt=""
        rounded
      />
      <img
        v-else-if="technology.icon"
        :src="technology.icon"
        alt=""
        class="size-12"
      />
      <span v-if="!props.flat" class="text-sm mt-1 text-center">{{ technology.name }}</span>
    </a>

    <span v-else class="flex flex-col items-center gap-1">
      <UAvatar
        v-if="props.flat"
        size="lg"
        :src="technology.icon"
        alt=""
        rounded
      />
      <img
        v-else-if="technology.icon"
        :src="technology.icon"
        alt=""
        class="size-12"
      />
      <span v-if="!props.flat" class="text-sm mt-1 text-center">{{ technology.name }}</span>
    </span>
  </UBadge>
</template>
