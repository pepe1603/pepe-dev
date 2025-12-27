<!-- //app/components/ui/ProfileHero.vue -->
<script setup lang="ts" name="ProfileHero">
import type { ProfileLinkView } from '~/composables/public/views/useProfileView';

defineProps<{
  name: string
  headline: string
  bio?: string
  avatar: string
  links?: ProfileLinkView[]
}>()
</script>

<template>
  <section class="text-center space-y-6">
    <div class="flex justify-center">
      <UAvatar
        :src="avatar"
        size="xl"
        class="ring-4 ring-primary/10"
      />
    </div>

    <div class="space-y-2">
      <h1 class="text-4xl md:text-5xl font-bold tracking-tight">
        {{ name }}
      </h1>
      <p class="text-xl text-muted">
        {{ headline }}
      </p>
    </div>

    <p v-if="bio" class="max-w-2xl mx-auto text-muted">
      {{ bio }}
    </p>

    <div v-if="links?.length" class="flex justify-center gap-3">
      <UButton
        v-for="link in links"
        :key="link.type"
        :to="link.url"
        target="_blank"
        variant="outline"
        color="primary"
        :icon="link.icon"
      />
    </div>

  </section>
</template>
