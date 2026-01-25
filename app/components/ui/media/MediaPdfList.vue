<!-- app/components/ui/media/MediaPdfList.vue -->

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
      <h3 class="text-xl font-semibold">Documentos</h3>
    </header>

    <ul class="space-y-3">
      <li
        v-for="pdf in items"
        :key="pdf.id"
        class="flex items-center justify-between gap-4 rounded-xl border border-accented bg-muted p-4"
      >
        <!-- Info -->
        <div class="min-w-0">
          <p class="font-medium truncate">
            {{ pdf.name }}
          </p>

          <p
            v-if="pdf.caption"
            class="text-sm text-muted-foreground"
          >
            {{ pdf.caption }}
          </p>
        </div>

        <!-- Action -->
        <a
          :href="pdf.src"
          target="_blank"
          rel="noopener"
          class="shrink-0 inline-flex items-center rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-accent transition"
        >
          Abrir PDF
        </a>
      </li>
    </ul>
  </section>
</template>
