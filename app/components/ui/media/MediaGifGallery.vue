<!-- app/components/ui/media/MediaGifGallery.vue -->

<script setup lang="ts">
import type { PublicMediaItem } from './publicMedia.types'

const props = defineProps<{
  items: PublicMediaItem[]
}>()
</script>

<template>
  <section class="space-y-4">
    <!-- Title -->
    <header>
      <h3 class="text-xl font-semibold">GIFs</h3>
    </header>

    <!-- Grid -->
    <div
      class="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
    >
      <figure
        v-for="gif in items"
        :key="gif.id"
        class="rounded-xl overflow-hidden border border-accented bg-muted"
      >
        <!-- GIF image -->
        <img
          :src="gif.src"
          :alt="gif.alt"
          loading="lazy"
          class="w-full h-full object-cover"
        />

        <!-- Caption -->
        <figcaption
          v-if="gif.caption"
          class="p-2 text-xs text-muted-foreground truncate"
        >
          {{ gif.caption }}
        </figcaption>
      </figure>
    </div>
  </section>
</template>
