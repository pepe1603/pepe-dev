<!-- app/components/common/PageLoader.vue -->
<script setup lang="ts">
interface Props {
  /** Tipo de loader: 'spinner', 'progress', 'skeleton' */
  type?: 'spinner' | 'progress' | 'skeleton'
  /** Mensaje opcional a mostrar */
  message?: string
  /** Número de skeletons a mostrar (solo para type='skeleton') */
  skeletonCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'spinner',
  message: 'Cargando...',
  skeletonCount: 3
})
</script>

<template>
  <div class="w-full">
    <!-- SPINNER LOADER -->
    <div
      v-if="type === 'spinner'"
      class="py-12 flex flex-col items-center justify-center gap-4"
    >
      <UIcon
        name="i-lucide-loader-circle"
        class="size-8 animate-spin text-primary"
      />
      <p v-if="message" class="text-sm text-muted">
        {{ message }}
      </p>
    </div>

    <!-- PROGRESS LOADER -->
    <div
      v-else-if="type === 'progress'"
      class="py-12 flex flex-col items-center justify-center gap-4"
    >
      <UProgress class="w-full max-w-md" />
      <p v-if="message" class="text-sm text-muted">
        {{ message }}
      </p>
    </div>

    <!-- SKELETON LOADER -->
    <div v-else-if="type === 'skeleton'">
      <slot>
        <!-- Default skeleton layout -->
        <div class="space-y-4">
          <div v-for="i in skeletonCount" :key="i" class="space-y-3">
            <USkeleton class="h-8 w-3/4" />
            <USkeleton class="h-4 w-full" />
            <USkeleton class="h-4 w-5/6" />
          </div>
        </div>
      </slot>
    </div>

  </div>
</template>
