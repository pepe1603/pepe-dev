<!-- components/admin/projects/media_project/ProjectMediaSortableList.vue -->
<script setup lang="ts" name="ProjectMediaSortableList">
import draggable from 'vuedraggable'
import { toRef } from 'vue'
import type { ProjectMediaItemModel } from '~/composables/admin/projects/media_project/models/ProjectMediaItemModel'
import { useSortableProjectMedia } from '~/composables/admin/projects/media_project/useSortableProjectMedia'

const props = defineProps<{
  media: ProjectMediaItemModel[]
}>()

const emit = defineEmits<{
  edit: [item: ProjectMediaItemModel]
  delete: [item: ProjectMediaItemModel]
}>()

const {
  items,
  isSorting,
  hasChanges,
  startSorting,
  cancelSorting,
  saveSorting,
} = useSortableProjectMedia(toRef(props, 'media'))

const isDragging = ref(false)


</script>

<template>
  <div class="space-y-4">
    <!-- Header completo -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Galería de imágenes
        </h3>
        <div class="flex items-center gap-4 mt-1 text-sm text-gray-500">
          <span class="flex items-center gap-1">
            <UIcon name="i-lucide-images" class="w-4 h-4" />
            {{ items.length }} imágenes
          </span>
          <span v-if="isSorting" class="flex items-center gap-1 text-success-500">
            <UIcon name="i-lucide-move" class="w-4 h-4" />
            Modo edición
          </span>
        </div>
      </div>

      <!-- Actions en el header -->
      <div class="flex gap-2">
        <UButton
          v-if="!isSorting"
          icon="i-lucide-arrow-up-down"
          variant="outline"
          @click="startSorting"
        >
          Reordenar
        </UButton>

        <template v-else>
          <UButton
            color="success"
            icon="i-lucide-save"
            :disabled="!hasChanges"
            @click="saveSorting"
          >
            Guardar
          </UButton>

          <UButton
            color="neutral"
            icon="i-lucide-x"
            variant="soft"
            @click="cancelSorting"
          >
            Cancelar
          </UButton>
        </template>
      </div>
    </div>

    <!-- Alert con instrucciones (solo cuando está ordenando) -->
    <UAlert v-if="isSorting" color="primary" variant="soft" icon="i-lucide-info">
      <template #description>
        <p>Arrastra el ícono <UIcon name="i-lucide-grip-vertical" class="inline w-4 h-4" /> para cambiar el orden de las imágenes</p>
      </template>
    </UAlert>

    <draggable
      v-model="items"
      item-key="id"
      :disabled="!isSorting"
      handle=".drag-handle"
      tag="div"
      class="space-y-1.5 rounded-lg "
      ghost-class="dragging-ghost"
      chosen-class="dragging-chosen"
      drag-class="dragging-active"
      :animation="200"
      @start="isDragging = true"
      @end="isDragging = false"
    >
      <template #item="{ element }">
        <div
          :key="element.id"
          class="relative bg-white dark:bg-gray-900 border border-primary-200 dark:border-primary-800 rounded-lg p-4 transition-all"
          :class="{ 
            'cursor-grabbing shadow-xl': isDragging,
            'hover:border-gray-300 dark:hover:border-gray-700': isSorting
          }"
        >
          <div class="flex items-center gap-4">
            <div 
              class="drag-handle flex-shrink-0"
              :class="isSorting ? 'cursor-grab active:cursor-grabbing' : 'cursor-not-allowed'"
            >
              <UIcon
                name="i-lucide-grip-vertical"
                class="text-2xl transition-colors"
                :class="isSorting ? 'text-primary-500 hover:text-primary-600' : 'text-gray-300'"
              />
            </div>

            <img
              :src="element.url"
              :alt="element.alt || element.name"
              class="h-16 w-24 object-cover rounded flex-shrink-0"
            />

            <div class="flex-1 min-w-0">
              <p class="font-medium truncate">
                {{ element.name }}
              </p>
              <p class="text-xs text-gray-500 mt-1">
                Orden: {{ element.sortOrder }}
              </p>
            </div>

            <div class="flex flex-col sm:flex-row gap-2 flex-shrink-0">
              <UButton
                size="xs"
                variant="outline"
                icon="i-lucide-pencil"
                :disabled="isSorting"
                @click.stop="$emit('edit', element)"
              />

              <UButton
                size="xs"
                variant="outline"
                color="error"
                icon="i-lucide-trash"
                :disabled="isSorting"
                @click.stop="$emit('delete', element)"
              />
            </div>
          </div>
        </div>
      </template>
    </draggable>

    <details class="text-xs mt-4">
      <summary class="cursor-pointer text-gray-500">Ver orden actual (debug)</summary>
      <pre class="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded overflow-auto text-xs">{{ items.map(i => ({ id: i.id, name: i.name, order: i.sortOrder })) }}</pre>
    </details>
  </div>
</template>

<style scoped>
/* Estilos para el drag & drop */
.dragging-ghost {
  opacity: 0.3;
  background-color: rgb(var(--color-primary-100));
}

.dragging-chosen {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border-color: rgb(var(--color-primary-500));
  border-width: 2px;
}

.dragging-active {
  transform: scale(1.05) rotate(1deg);
  z-index: 1000;
}
</style>
