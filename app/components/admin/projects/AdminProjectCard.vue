<script setup lang="ts" name="AdminProjectCard">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { ProjectFormModel } from '~/composables/admin/projects/models/ProjectFormModel'


const router = useRouter()

const props = defineProps<{
  project: ProjectFormModel 
  softDelete: (id: string) => Promise<void>
  restore: (id: string) => Promise<void>
  archive: (id: string) => Promise<void>
}>()

const showConfirm = ref(false)
const targetAction = ref<null | 'delete' | 'archive'>(null)

const goToEdit = (id: string) => router.push(`/admin/projects/${id}`)

const handleAction = async () => {
  if (!props.project.id) {
    console.error('Project ID missing!')
    return
  }
  if (targetAction.value === 'delete') await props.softDelete(props.project.id)
  if (targetAction.value === 'archive') await props.archive(props.project.id)
  targetAction.value = null
  showConfirm.value = false
}

const openConfirm = (action: 'delete' | 'archive') => {
  targetAction.value = action
  showConfirm.value = true
}
const openPublicView = (slug: string, event: MouseEvent) => {
  event.preventDefault() // Evita que el NuxtLink se active
  window.open(`/projects/${slug}`, '_blank')
}
//format 25 ENer 2026: 
const formatDate = (date: string | null) => {
  if (!date) return '—'
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(new Date(date))
}

</script>

<template>
  <div class="group relative bg-elevated border border-accented rounded-xl overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300">
    <!-- FEATURED PIN -->
    <div
      v-if="project.isFeatured"
      class="absolute top-3 right-3 z-10 bg-yellow-500/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg"
    >
      <UIcon
        name="i-lucide-star"
        class="relative flex items-center justify-center text-white w-4 h-4"
      />
    </div>
            <!-- Botón para abrir en nueva pestaña -->
        <UButton
          icon="i-lucide-external-link"
          color="primary"
          variant="soft"
          label="preview"
          size="xs"
          class="absolute bottom-2 right-2 z-10 opacity-0 group-hover:opacity-70 transition-opacity border"
          aria-label="Abrir en nueva pestaña"
          @click="(e) => openPublicView(project.slug, e)"
        />

    <!-- THUMBNAIL -->
    <div class="relative h-48 bg-muted overflow-hidden">
      <img
        v-if="project.thumbnailUrl"
        :src="project.thumbnailUrl"
        :alt="project.title"
        class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div
        v-else
        class="h-full w-full flex items-center justify-center"
      >
        <UIcon name="i-lucide-image" class="w-12 h-12 text-muted" />
      </div>

      <!-- OVERLAY ACTIONS -->
      <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-transparent flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <UButton
          icon="i-lucide-pencil"
          color="primary"
          size="md"
          @click="goToEdit(project.id)"
        />
        <UButton
          v-if="project.status !== 'trashed'"
          icon="i-lucide-trash-2"
          color="error"
          size="md"
          variant="soft"
          @click="openConfirm('delete')"
        />
        <UButton
          v-if="project.status !== 'archived' && project.status !== 'trashed'"
          icon="i-lucide-archive"
          color="neutral"
          size="md"
          variant="soft"
          @click="openConfirm('archive')"
        />
        <UButton
          v-else-if="project.status === 'trashed'"
          icon="i-lucide-refresh-ccw"
          color="primary"
          size="md"
          variant="soft"
          @click="props.restore(project.id)"
        />

      </div>
    </div>

    <!-- CONTENT -->
    <div class="p-5 space-y-3">
      <div>
        <h3 class="font-semibold text-lg text-highlighted line-clamp-1">
          {{ project.title }}
        </h3>
        <p v-if="project.subtitle" class="text-sm text-muted mt-1 line-clamp-1">
          {{ project.subtitle }}
        </p>
      </div>
      <p class="text-sm text-muted line-clamp-2 leading-relaxed">
        {{ project.shortDescription }}
      </p>

      <!-- FECHAS -->
      <div class="flex flex-wrap gap-4 text-xs text-muted mt-2">
        <span>
          Creado: {{ formatDate(project.createdAt) }}
        </span>
        <span v-if="project.updatedAt">
          Actualizado: {{ formatDate(project.updatedAt) }}
        </span>
      </div>
    </div>


    <!-- INDICATORS -->
    <div class="px-5 pb-5 flex flex-wrap gap-2">

      <UBadge v-if="project.status === 'published'" color="success" variant="soft" size="md">
        <UIcon name="i-lucide-check-circle" class="w-3.5 h-3.5" />
        Publicado
      </UBadge>
      <UBadge v-else-if="project.status === 'archived'" color="neutral" variant="soft" size="md">
        <UIcon name="i-lucide-archive" class="w-3.5 h-3.5" />
        Archivado
      </UBadge>
      <UBadge v-else-if="project.status === 'trashed'" color="error" variant="soft" size="md">
        <UIcon name="i-lucide-trash-2" class="w-3.5 h-3.5" />
        Eliminado
      </UBadge>
      <UBadge v-else color="warning" variant="soft" size="md">
        <UIcon name="i-lucide-file-edit" class="w-3.5 h-3.5" />
        Borrador
      </UBadge>
    </div>

    <!-- CONFIRM MODAL -->
    <UModal
      v-model:open="showConfirm"
      :title="`${targetAction === 'delete' ? 'Eliminar' : 'Archivar'} proyecto`"
      :description="`¿Estás seguro de ${targetAction === 'delete' ? 'eliminar' : 'archivar'} ?`"
    >
      <template #body>
        <div class="flex items-start gap-3 p-2">
          <div 
            :class="[
              'flex items-center justify-center w-10 h-10 rounded-full',
              targetAction === 'delete' ? 'bg-error/10' : 'bg-warning/10'
            ]"
          >
            <UIcon
              :name="targetAction === 'delete' ? 'i-lucide-trash-2' : 'i-lucide-archive'"
              :class="[
                'w-5 h-5',
                targetAction === 'delete' ? 'text-error' : 'text-warning'
              ]"
            />
          </div>
          <p class="text-sm text-muted flex-1 pt-1.5">
            Esta acción {{ targetAction === 'delete' ? 'moverá el proyecto a la papelera' : 'ocultará el proyecto del sitio público' }}.
            {{ targetAction === 'delete' ? 'Podrás restaurarlo más tarde.' : '' }}
          </p>
        </div>
      </template>

      <template #footer>
        <div class="flex justify-end gap-2 w-full">
          <UButton
            color="neutral"
            variant="outline"
            label="Cancelar"
            @click="showConfirm = false"
          />
          <UButton
            :color="targetAction === 'delete' ? 'error' : 'warning'"
            :icon="targetAction === 'delete' ? 'i-lucide-trash-2' : 'i-lucide-archive'"
            :label="`Sí, ${targetAction === 'delete' ? 'eliminar' : 'archivar'}`"
            @click="handleAction"
          />
        </div>
      </template>
    </UModal>
  </div>
</template>
