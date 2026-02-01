<!-- app/components/admin/projects/media_project/ProjectMediaPanel.vue -->
<script setup lang="ts">
import { ref, watch } from 'vue'
import { MEDIA_TYPES } from '~/constants/mediaTypes'
import type { ProjectMediaItemModel } from '~/composables/admin/projects/media_project/models/ProjectMediaItemModel'

import { useAdminProjectMediaQuery } from '~/composables/admin/projects/media_project/queries/useAdminProjectMediaQuery'
import { useProjectMediaUseCases } from '~/composables/admin/projects/media_project/usecases/useProjectMediaUseCases'

import ProjectMediaUpload from './ProjectMediaUpload.vue'
import type { AccordionItem } from '@nuxt/ui'

const props = defineProps<{
  projectId: string
  projectSlug: string
}>()

const toast = useToast()

/**
 * Query
 */
const {
  media,
  loading,
  error,
  refetch,
} = useAdminProjectMediaQuery(props.projectId)

/**
 * UseCases
 */
const {
  createMedia,
  updateMedia,
  deleteMedia,
} = useProjectMediaUseCases()

/**
 * Accordion items
 */
const accordionItems = ref<AccordionItem[]>([
  {
    label: 'Subir nuevo media',
    icon: 'i-lucide-upload-cloud',
    slot: 'upload',
  }
])

/**
 * Estado editable local
 */
const mediaItems = ref<ProjectMediaItemModel[]>([])

const editingItemId = ref<string | null>(null)

const isEditing = (itemId: string) => editingItemId.value === itemId

const startEditing = (itemId: string) => {
  if (editingItemId.value !== itemId) {
    editingItemId.value = itemId
  }
}


const stopEditing = () => {
  editingItemId.value = null
}


watch(media, () => {
  mediaItems.value = [...media.value]
}, { immediate: true })

/**
 * Crear nuevo media desde upload
 */
const onUploaded = async (
  payload: {
    url: string
    name: string
    type: ProjectMediaItemModel['type']
  }
) => {
  try {
    const newItem = await createMedia({
      projectId: props.projectId,
      url: payload.url,
      name: payload.name,
      type: payload.type,
      alt: null,
      caption: null
    })

    mediaItems.value.push(newItem)

    toast.add({
      title: 'Media añadida',
      color: 'success',
    })
  } catch (e: any) {
    toast.add({
      title: 'Error al crear media',
      description: e.message,
      color: 'error',
    })
  }
}

/**
 * Guardar cambios de metadata
 */
const saveItem = async (item: ProjectMediaItemModel) => {
  try {
    await updateMedia(item.id, {
      alt: item.alt,
      caption: item.caption,
      type: item.type
    })

    editingItemId.value = null

    toast.add({
      title: 'Media actualizada',
      color: 'success',
    })
  } catch (e: any) {
    toast.add({
      title: 'Error al actualizar media',
      description: e.message,
      color: 'error',
    })
  }
}


/**
 * Eliminar media
 */
const removeItem = async (item: ProjectMediaItemModel) => {
  try {
    await deleteMedia(item.id)
    mediaItems.value = mediaItems.value.filter(i => i.id !== item.id)

    if (editingItemId.value === item.id) {
      editingItemId.value = null
    }

    toast.add({
      title: 'Media eliminada',
      color: 'success',
    })
  } catch (e: any) {
    toast.add({
      title: 'Error al eliminar media',
      description: e.message,
      color: 'error',
    })
  }
}



const dropdownItems = (item: ProjectMediaItemModel) => [
  [
    {
      label: 'Editar',
      icon: 'i-lucide-pencil',
      onSelect: () => startEditing(item.id)
    },
    {
      label: 'Eliminar',
      icon: 'i-lucide-trash',
      onSelect: () => removeItem(item)
    }
  ]
]


</script>

<template>
  <div class="space-y-6">
    <h3 class="text-lg font-semibold">
      Media del proyecto
    </h3>
    <UAlert 
      color="primary" 
      variant="soft"
      icon="i-lucide-info"
      class="mb-4"
    >
      <template #title>
        Indicaciones para Media Project
      </template>
      
      <template #description>
        <ul class="list-disc list-inside mt-2 space-y-1 text-sm">
          <li>Sube imágenes o gifs y videos relacionados con el proyecto.</li>
          <li>Agrega descripciones (Alt) y captions para mejorar accesibilidad y SEO.</li>
          <li>El orden de los elementos se puede ajustar arrastrando o modificando sortOrder.</li>
          <li>Los cambios se guardan individualmente en cada media item.</li>
          <span class="text-warning">Nota: No Audios</span>
        </ul>
      </template>
    </UAlert>

    <!-- Upload -->
    <!-- Accordion para Upload -->
    <UAccordion :items="accordionItems" :unmount-on-hide="false" >
      <template #upload>
        <div class="pb-4">
          <ProjectMediaUpload
            :project-slug="projectSlug"
            @uploaded="onUploaded"
          />
        </div>
      </template>
    </UAccordion>

    <!-- Loading -->
    <div v-if="loading" class="text-sm text-muted">
      Cargando media…
    </div>

    <!-- Error -->
    <UAlert
      v-if="error"
      color="error"
      variant="soft"
      icon="i-lucide-sad"
      :title="error"
    />

    <!-- Lista -->
    <div
      v-if="mediaItems.length"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <UCard
        v-for="item in mediaItems"
        :key="item.id"
        class="group"
      >
        <!-- Preview -->
        <div class="relative h-44 overflow-hidden rounded-md bg-muted">
          <!-- Image & GIF -->
          <img
            v-if="item.type === 'image' || item.type === 'gif'"
            :src="item.url"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <!-- Video -->
          <video
            v-else-if="item.type === 'video'"
            :src="item.url"
            controls
            class="w-full h-full object-cover"
          />

          <!-- PDF -->
          <div
            v-else-if="item.type === 'pdf'"
            class="h-full flex items-center justify-center text-sm text-muted"
          >
            📄 PDF
          </div>

          <!-- Tipo -->
          <UBadge
            color="primary"
            variant="solid"
            size="xs"
            class="absolute top-2 left-2 capitalize"
          >
            {{ item.type }}
          </UBadge>
        </div>

        <!-- Metadata -->
        <div 
          v-if="isEditing(item.id)"
          class="space-y-3 mt-4"
        >
          <UInput
            v-model="item.alt"
            size="sm"
            class="w-full"
            placeholder="Alt text (accesibilidad)"
          />

          <UInput
            v-model="item.caption"
            size="sm"
            class="w-full"
            placeholder="Caption / descripción"
          />

          <USelect
            v-model="item.type"
            :items="MEDIA_TYPES.map(t => ({ label: t, value: t }))"
            size="sm"
          />

        </div>


        <!-- Metadata (read-only) -->
        <div
          v-if="!isEditing(item.id)"
          class="mt-4 space-y-1 text-sm text-muted"
        >
          <p>
            <span class="font-medium text-gray-700 dark:text-gray-300">Nombre:</span>
            {{ item.name }}
          </p>

          <p v-if="item.alt">
            <span class="font-medium text-gray-700 dark:text-gray-300">Alt:</span>
            {{ item.alt }}
          </p>

          <p v-if="item.caption">
            <span class="font-medium text-gray-700 dark:text-gray-300">Caption:</span>
            {{ item.caption }}
          </p>

          <p>
            <span class="font-medium text-gray-700 dark:text-gray-300">Tipo:</span>
            {{ item.type }}
          </p>
        </div>


        <USeparator class="my-4" />

        <!-- Actions -->
        <div class="flex items-center justify-between">
          <!-- Guardar SOLO si está editando -->
          <UButton
            v-if="isEditing(item.id)"
            size="xs"
            color="primary"
            icon="i-lucide-save"
            @click="saveItem(item)"
          >
            Guardar
          </UButton>

          <span v-else class="text-xs text-muted italic">
            Solo lectura
          </span>

          <!-- Dropdown -->
          <UDropdownMenu :items="dropdownItems(item)">
            <UButton
              size="xs"
              variant="ghost"
              icon="i-lucide-more-vertical"
            />
          </UDropdownMenu>

        </div>

      </UCard>
    </div>

  </div>
</template>
