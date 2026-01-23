<!-- app/components/ui/media/MediaVideoGrid.vue -->
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
      <h3 class="text-xl font-semibold">Videos</h3>
    </header>

    <!-- Grid -->
    <div
      class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    >
      <figure
        v-for="video in items"
        :key="video.id"
        class="rounded-xl overflow-hidden border border-accented bg-muted"
      >
        <!-- Video -->
        <video
          :src="video.src"
          controls
          preload="metadata"
          class="w-full aspect-video bg-black"
        />

        <!-- Meta -->
        <figcaption class="p-3 space-y-1">
          <p class="font-medium truncate">
            {{ video.name }}
          </p>

          <p
            v-if="video.caption"
            class="text-sm text-muted-foreground"
          >
            {{ video.caption }}
          </p>
        </figcaption>
      </figure>
    </div>
  </section>
</template>



 <!-- <script setup lang="ts" version 1>
import type { PublicMediaItem } from './publicMedia.types'

defineProps<{
  items: PublicMediaItem[]
}>()
</script>

<template>
  <section class="space-y-4">

    <header>
      <h3 class="text-xl font-semibold">Videos</h3>
    </header>

    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <figure
        v-for="video in items"
        :key="video.id"
        class="rounded-xl overflow-hidden border border-accented bg-muted shadow-sm"
      >
        <video
          class="w-full aspect-video object-cover"
          controls
          preload="metadata"
        >
          <source :src="video.src" type="video/mp4" />
          Tu navegador no soporta video HTML5.
        </video>

        
        <figcaption
          v-if="video.caption"
          class="p-3 text-sm text-muted"
        >
          {{ video.caption }}
        </figcaption>
      </figure>
    </div>
  </section>
</template> -->

