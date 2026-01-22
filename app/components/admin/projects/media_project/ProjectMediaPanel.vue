<!-- app/components/admin/projects/media_project/ProjectMediaPanel.vue -->
 <script setup lang="ts">
import { ref, watch } from 'vue'
import { MEDIA_TYPES } from '~/constants/mediaTypes'
import type { ProjectMediaItemModel } from '~/composables/admin/projects/media_project/models/ProjectMediaItemModel'

import { useAdminProjectMediaQuery } from '~/composables/admin/projects/media_project/queries/useAdminProjectMediaQuery'
import { useProjectMediaUseCases } from '~/composables/admin/projects/media_project/usecases/useProjectMediaUseCases'

import ProjectMediaUpload from './ProjectMediaUpload.vue'

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

    <!-- Upload -->
    <ProjectMediaUpload
    :project-slug="projectSlug"
      @uploaded="onUploaded"
    />

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
        class="border rounded p-4 space-y-2 bg-elevated"
      >
        <!-- Preview -->
        <div class="h-32 rounded overflow-hidden bg-muted">
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
        <UInput v-model="item.alt" placeholder="Alt" />
        <UInput v-model="item.caption" placeholder="Caption" />

        <USelect
          v-model="item.type"
          :options="MEDIA_TYPES.map(t => ({ label: t, value: t }))"
        />

        <div class="flex justify-between pt-2">
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
