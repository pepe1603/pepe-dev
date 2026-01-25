<!-- app/components/ui/media/PublicMediaRenderer.vue -->
<script setup lang="ts">
import { computed } from 'vue'

import MediaImageGallery from './MediaImageGallery.vue'
import MediaVideoGrid from './MediaVideoGrid.vue'
import MediaGifGallery from './MediaGifGallery.vue'
import MediaPdfList from './MediaPdfList.vue'

import type { PublicMediaItem } from './publicMedia.types'
import type { MediaType } from '~/constants/mediaTypes'

const props = defineProps<{
  media: PublicMediaItem[]
}>()

/**
 * Agrupa la media por tipo
 */
const mediaByType = computed<Partial<Record<MediaType, PublicMediaItem[]>>>(() => {
  const groups: Partial<Record<MediaType, PublicMediaItem[]>> = {}

  for (const item of props.media ?? []) {
    if (!groups[item.type]) {
      groups[item.type] = []
    }
    groups[item.type]!.push(item)
  }

  return groups
})
</script>


<template>
  <section v-if="media?.length" class="space-y-12">

    <!-- IMAGES -->
    <MediaImageGallery
      v-if="mediaByType.image?.length"
      :items="mediaByType.image"
    />

    <!-- VIDEOS -->
    <MediaVideoGrid
      v-if="mediaByType.video?.length"
      :items="mediaByType.video"
    />

    <!-- GIFS -->
    <MediaGifGallery
      v-if="mediaByType.gif?.length"
      :items="mediaByType.gif"
    />

    <!-- PDFS (opcional) -->
    <MediaPdfList
      v-if="mediaByType.pdf?.length"
      :items="mediaByType.pdf"
    />

  </section>
</template>

