<!-- app/components/ui/media/MediaImageGallery.vue -->

<script setup lang="ts">
import type { PublicMediaItem } from './publicMedia.types'

const props = defineProps<{
  items: PublicMediaItem[]
}>()

const selected = ref<PublicMediaItem | null>(null)
</script>

<template>
  <section class="space-y-4">
    <!-- Title -->
    <header>
      <h3 class="text-xl font-semibold">Galería</h3>
    </header>

    <!-- Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <button
        v-for="img in items"
        :key="img.id"
        type="button"
        class="group relative rounded-xl overflow-hidden border border-accented bg-muted focus:outline-none"
        @click="selected = img"
      >
        <img
          :src="img.src"
          :alt="img.alt"
          loading="lazy"
          class="w-full h-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <!-- Hover overlay -->
        <div
          class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-sm"
        >
          Ver imagen
        </div>
      </button>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <div
        v-if="selected"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
        @click.self="selected = null"
      >
        <figure class="max-w-5xl w-full space-y-3">
          <img
            :src="selected.src"
            :alt="selected.alt"
            class="w-full max-h-[80vh] object-contain rounded-xl"
          />

          <figcaption
            v-if="selected.caption"
            class="text-center text-sm text-gray-200"
          >
            {{ selected.caption }}
          </figcaption>
        </figure>
      </div>
    </Teleport>
  </section>
</template>




<!-- <script setup lang="ts" vbersion 1>
import type { PublicMediaItem } from './publicMedia.types'

defineProps<{
  items: PublicMediaItem[]
}>()
</script>

<template>
  <section>
    <h3 class="text-lg font-semibold mb-4">
      Galería
    </h3>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
    >
      <figure
        v-for="item in items"
        :key="item.id"
        class="group relative overflow-hidden rounded-lg border bg-muted"
      >
        <img
          :src="item.src"
          :alt="item.alt"
          class="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        <figcaption
          v-if="item.caption"
          class="absolute inset-x-0 bottom-0 bg-black/60 text-white text-xs px-2 py-1"
        >
          {{ item.caption }}
        </figcaption>
      </figure>
    </div>
  </section>
</template> -->
