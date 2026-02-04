<!-- app/components/ui/media/PublicMediaRenderer.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import MediaImageGallery from './MediaImageGallery.vue'
import type { PublicMediaItem } from './publicMedia.types'

/**
 * ⚠️ IMPORTANTE
 * Este componente asume que `media` ya viene
 * ordenado por `sortOrder` desde el ViewModel.
 */

const props = defineProps<{
  media: PublicMediaItem[]
}>()

const images = computed(() => props.media)
</script>

<template>
  <section v-if="images.length">
    <MediaImageGallery :items="images" />
  </section>
</template>
