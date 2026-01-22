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
      caption: null,
      sortOrder: mediaItems.value.length,
      status: 'draft',
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
      type: item.type,
      status: item.status,
      sortOrder: item.sortOrder,
    })

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
          <li>Sube imágenes, videos o audios relacionados con el proyecto.</li>
          <li>Agrega descripciones (Alt) y captions para mejorar accesibilidad y SEO.</li>
          <li>El orden de los elementos se puede ajustar arrastrando o modificando sortOrder.</li>
          <li>Los cambios se guardan individualmente en cada media item.</li>
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
      :title="error"
    />

    <!-- Lista -->
    <div
      v-if="mediaItems.length"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <div
        v-for="item in mediaItems"
        :key="item.id"
        class="border border-accented rounded-lg p-3 bg-elevated shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        <!-- Preview -->
        <div class="h-40 rounded overflow-hidden bg-muted relative mb-2">
          <img
            v-if="item.type === 'image'"
            :src="item.url"
            class="w-full h-full object-cover"
          />
          <video
            v-else-if="item.type === 'video'"
            :src="item.url"
            controls
            class="w-full h-full"
          />
          <audio
            v-else-if="item.type === 'audio'"
            :src="item.url"
            controls
            class="w-full"
          />
          <div
            v-else
            class="h-full flex items-center justify-center text-sm text-muted"
          >
            Sin preview
          </div>
        </div>

         <!-- Metadata -->
        <UInput v-model="item.alt" placeholder="Alt text" size="sm" class="mb-2 w-full" />
        <UInput v-model="item.caption" placeholder="Caption" size="sm" class="mb-2 w-full" />

        <USelect
          v-model="item.type"
          :items="MEDIA_TYPES.map(t => ({ label: t, value: t }))"
          size="sm"
          class="mb-2"
        />


        <div class="flex justify-between mt-2 gap-2">
          <UButton
            size="xs"
            color="primary"
            @click="saveItem(item)"
          >
            Guardar
          </UButton>

          <UButton
            size="xs"
            color="error"
            variant="soft"
            @click="removeItem(item)"
          >
            Eliminar
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
