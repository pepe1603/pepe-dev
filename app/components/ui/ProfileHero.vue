<!-- //app/components/ui/ProfileHero.vue -->
<script setup lang="ts" name="ProfileHero">
import type { ProfileLinkView } from '~/composables/public/views/useProfileView';

defineProps<{
  name: string
  headline: string
  bio?: string
  avatar: string
  location?: string
  email?: string
  cvUrl?: string | null
  links?: ProfileLinkView[]
  fields?: string[] // campos a renderizar: ['bio','location','email','cv']
}>()
</script>

<template>
  <section class="text-center space-y-6">
    <div class="flex justify-center">
      <UAvatar
        :src="avatar"
        size="3xl"
        class="ring-4 ring-primary/10 size-16 md:size-48 lg:size-56"
      />
    </div>

    <div class="space-y-2">
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
        {{ name }}
      </h1>
      <p v-if="fields?.includes('headline')" class="text-xl text-muted" >
        {{ headline }}
      </p>
    </div>

    <p v-if="bio && fields?.includes('bio')" class="max-w-2xl mx-auto text-muted">
      {{ bio }}
    </p>

    <div class="flex flex-wrap gap-4 text-sm text-muted  justify-start md:justify-center pt-2">
      <p v-if="location && fields?.includes('location')" class="text-muted">
        Ubicación: {{ location }}
      </p>

      <p v-if="email && fields?.includes('email')" class="text-muted">
        Email: {{ email }}
      </p>
    </div>

    <div v-if="links?.length && fields?.includes('links')" class="flex justify-center gap-3">
      <UButton
        v-for="link in links"
        :key="link.type"
        :to="link.url"
        target="_blank"
        variant="outline"
        color="primary"
        :icon="link.icon"
      />
      <UButton
        v-if="cvUrl && fields?.includes('cv')"
        :to="cvUrl"
        target="_blank"
        variant="outline"
        color="primary"
      >
        Descarga mi CV
      </UButton>
    </div>
  </section>
</template>
