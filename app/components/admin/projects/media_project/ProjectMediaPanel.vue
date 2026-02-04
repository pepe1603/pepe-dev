<!-- app/components/admin/projects/media_project/ProjectMediaPanel.vue -->
<script setup lang="ts" name="ProjectMediaPanel">
import { ref, watch } from 'vue'
import type { ProjectMediaItemModel } from '~/composables/admin/projects/media_project/models/ProjectMediaItemModel'

import { useAdminProjectMediaQuery } from '~/composables/admin/projects/media_project/queries/useAdminProjectMediaQuery'
import { useProjectMediaUseCases } from '~/composables/admin/projects/media_project/usecases/useProjectMediaUseCases'

import ProjectMediaUpload from './ProjectMediaUpload.vue'
import ProjectMediaSortableList from './ProjectMediaSortableList.vue'
import ProjectMediaEditModal from './ProjectMediaEditModal.vue'

import type { AccordionItem } from '@nuxt/ui'

const props = defineProps<{
  projectId: string
  projectSlug: string
}>()

const toast = useToast()

/* ---------------- QUERY ---------------- */
const { media, loading, error } =
  useAdminProjectMediaQuery(props.projectId)

/* ---------------- USE CASES ---------------- */
const {
  createMedia,
  updateMedia,
  deleteMedia,
} = useProjectMediaUseCases()

/* ---------------- LOCAL STATE ---------------- */
const mediaItems = ref<ProjectMediaItemModel[]>([])

watch(media, () => {
  mediaItems.value = [...media.value]
}, { immediate: true })

/* ---------------- UPLOAD ---------------- */
const accordionItems = ref<AccordionItem[]>([
  {
    label: 'Añadir imagen a la galería',
    icon: 'i-lucide-upload-cloud',
    slot: 'upload',
  }
])

const onUploaded = async (payload: { url: string; name: string }) => {
  try {
    const newItem = await createMedia({
      projectId: props.projectId,
      url: payload.url,
      name: payload.name,
      alt: null,
      caption: null,
    })

    mediaItems.value = [...mediaItems.value, newItem]

    toast.add({
      icon: 'i-lucide-circle-check',
      title: 'Listo!',
      description: 'Imagen añadida',
      color: 'success',
    })
  } catch (e: any) {
    toast.add({
      icon: 'i-lucide-circle-x',
      title: 'Error al subir imagen',
      description: e.message,
      color: 'error',
    })
  }


}

/* ---------------- EDIT MODAL ---------------- */
const isEditModalOpen = ref(false)
const selectedItem = ref<ProjectMediaItemModel | null>(null)

const openEditModal = (item: ProjectMediaItemModel) => {
  selectedItem.value = item
  isEditModalOpen.value = true
}

const saveFromModal = async (item: ProjectMediaItemModel) => {
  try {
    await updateMedia(item.id, {
      name: item.name,
      alt: item.alt,
      caption: item.caption,
    })

    const index = mediaItems.value.findIndex(i => i.id === item.id)
    if (index !== -1) {
      mediaItems.value[index] = { ...item }
    }

    toast.add({
      icon: 'i-lucide-circle-check',
      title: 'Listo!',
      description: 'Imagen Actualziada ',
      color: 'success',
    })
  } catch (e: any) {
    toast.add({
      icon: 'i-lucide-circle-x',
      title: 'Error al guardar cambios',
      description: e.message,
      color: 'error',
    })
  }
}

/* ---------------- DELETE ---------------- */
const removeItem = async (item: ProjectMediaItemModel) => {
  try {
    await deleteMedia(item.id)
    mediaItems.value = mediaItems.value.filter(i => i.id !== item.id)

    toast.add({
      icon: 'i-lucide-circle-check',
      title: 'Imagen eliminada',
      color: 'success',
    })
  } catch (e: any) {
    toast.add({
      icon: 'i-lucide-circle-x',
      title: 'Error al eliminar imagen',
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

    <!-- Info -->
<UAlert color="info" variant="soft" icon="i-lucide-images">
  <template #title>Galería del proyecto</template>
  <template #description>
    <p class="text-sm">
      Aquí gestionas las imágenes que forman parte del portfolio.
    </p>
    <ul class="mt-2 list-disc list-inside text-sm space-y-1">
      <li>Sube imágenes una por una</li>
      <li>Reordénalas arrastrando</li>
      <li>Edita nombre, alt y descripción</li>
    </ul>
  </template>
</UAlert>

    <!-- Upload -->
    <UAccordion :items="accordionItems" :unmount-on-hide="false">
      <template #upload>
        <div class="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 space-y-4">
          
          <!-- Header del uploader -->
          <div class="flex items-start gap-3">
            <UIcon name="i-lucide-upload-cloud" class="mt-1 text-primary-500" />
            <div>
              <p class="font-medium text-sm">
                Añadir imagen a la galería
              </p>
              <p class="text-xs text-muted">
                La imagen se añadirá al final de la galería y podrás editarla después.
              </p>
            </div>
          </div>

          <!-- Uploader -->
          <ProjectMediaUpload
            :project-slug="projectSlug"
            @uploaded="onUploaded"
          />
        </div>
      </template>

    </UAccordion>

    <!-- Loading / Error -->
    <div v-if="loading" class="text-sm text-muted">
      Cargando imágenes…
    </div>

    <UAlert
      v-if="error"
      color="error"
      variant="soft"
      icon="i-lucide-alert-triangle"
      :title="error"
    />

      <div
        v-if="!loading && !mediaItems.length"
        class="rounded-xl border border-dashed border-gray-300 dark:border-gray-700
              p-8 text-center bg-gray-50 dark:bg-gray-900"
      >
        <UIcon name="i-lucide-images" class="mx-auto mb-2 size-8 text-gray-400" />
        <p class="text-sm font-medium">
          Este proyecto aún no tiene imágenes
        </p>
        <p class="text-xs text-muted mt-1">
          Usa “Subir nueva imagen” para empezar a construir la galería.
        </p>
      </div>


    <!-- Sortable list -->
    <ProjectMediaSortableList
      v-if="mediaItems.length"
      :media="mediaItems"
      @edit="openEditModal"
      @delete="removeItem"
    />

    <!-- Edit Modal -->
    <ProjectMediaEditModal
      v-model="isEditModalOpen"
      :media="selectedItem"
      @save="saveFromModal"
    />
  </div>
</template>
