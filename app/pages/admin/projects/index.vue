<!-- app/pages/admin/projects/index-vue -->
<script setup lang="ts">
import { h, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import AdminProjectCard from '~/components/admin/projects/AdminProjectCard.vue'
import { useAdminProjectsQuery } from '~/composables/admin/projects/queries/useAdminProjectsQuery'
import { useAdminProjectsMutations } from '~/composables/admin/projects/queries/useAdminProjectsMutations'
import type { TableColumn } from '@nuxt/ui'
import type { ProjectFormModel } from '~/composables/admin/projects/models/ProjectFormModel'
import type { RecordStatus } from '~/types'
import PageLoader from '~/components/common/PageLoader.vue'

definePageMeta({
  layout: false,
  // middleware: 'admin-auth',
  name: 'admin-projects',
})

const router = useRouter()
const { projects, loading, error } = useAdminProjectsQuery()
const { softDelete, restore, archive } = useAdminProjectsMutations(projects)

const toast = useToast()
const UButton = resolveComponent('UButton')

const goToCreate = () => router.push('/admin/projects/new')

// -------------------------------------------------
// AdminProject: solo los campos que necesitamos
// -------------------------------------------------
type AdminProject = {
  id: string
  status: RecordStatus
  updatedAt: string | null | undefined
}

const toAdminProject = (p: ProjectFormModel): AdminProject => ({
  id: p.id!,
  status: p.status,
  updatedAt: p.updatedAt,
})

// -------------------------------------------------
// Computed con tipado seguro
// -------------------------------------------------
const adminProjects = computed<AdminProject[]>(() =>
  projects.value.map(toAdminProject)
)

const publishedCount = () =>
  adminProjects.value.filter(p => p.status === 'published').length

const draftCount = () =>
  adminProjects.value.filter(p => p.status === 'draft').length

const archivedCount = () =>
  adminProjects.value.filter(p => p.status === 'archived').length

const deletedProjects = computed(() =>
  adminProjects.value.filter(p => p.status === 'trashed')
)

// -------------------------------------------------
// Modal de eliminación permanente
// -------------------------------------------------
const showDeleteModal = ref(false)
const projectToDelete = ref<null | string>(null)

const confirmPermanentDelete = (id: string) => {
  projectToDelete.value = id
  showDeleteModal.value = true
}

const handlePermanentDelete = async () => {
  if (!projectToDelete.value) return
  try {
    const { error } = await useSupabaseClient()
      .from('projects')
      .delete()
      .eq('id', projectToDelete.value)
    if (error) throw error

    projects.value = projects.value.filter(p => p.id !== projectToDelete.value)
    projectToDelete.value = null
    showDeleteModal.value = false
    toast.add({ title: 'Proyecto eliminado permanentemente', color: 'success' })
  } catch (err: any) {
    console.error(err)
    toast.add({ title: 'Ocurrió un error al eliminar el proyecto permanentemente', color: 'error' })
  }
}

// -------------------------------------------------
// Columnas para UTable
// -------------------------------------------------
const adminColumns: TableColumn<AdminProject>[] = [
  {
    accessorKey: 'status',
    header: 'Estado',
  },
  {
    accessorKey: 'updatedAt',
    header: 'Actualizado',
    cell: ({ row }) =>
      row.getValue('updatedAt')
        ? new Date(row.getValue('updatedAt') as string).toLocaleDateString()
        : '—'
  },
  {
    id: 'actions',
    header: 'Acciones',
    cell: ({ row }) =>
      h('div', { class: 'flex gap-2' }, [
        h(UButton, {
          color: 'primary',
          size: 'sm',
          icon: 'i-lucide-refresh-ccw',
          label: 'Restaurar',
          onClick: () => restore(row.original.id)
        }),
        h(UButton, {
          color: 'error',
          size: 'sm',
          icon: 'i-lucide-trash-2',
          label: 'Eliminar',
          onClick: () => confirmPermanentDelete(row.original.id)
        })
      ])
  }
]
</script>


<template>
  <div>
    <NuxtLayout
      name="admin"
      title="Proyectos"
      description="Gestiona tus proyectos"
    >
      <!-- PAGE ACTIONS -->
      <template #page-actions>
        <UButton
          color="primary"
          icon="i-lucide-plus"
          size="sm"
          @click="goToCreate"
        >
          Agregar
        </UButton>
      </template>

      <!-- Loading -->
      <PageLoader v-if="loading" type="skeleton" >

         <!-- Cards items -->
            <div class="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-start">
              <UCard
                  v-for="card in 4"
                  :key="card"
                  class="p-5 space-y-3 h-64 md:h-72 lg:h-80 w-full"
                >
                <div class="space-y-3">

                  <div class="flex items-center justify-between">
                    <USkeleton class="h-4 w-3/5" />
                    <USkeleton class="size-8 rounded-full" />
                  </div>

                  <USkeleton class="h-2 w-full" />

                  <div class="flex gap-4 text-sm text-muted">
                    <USkeleton class="h-2 w-5/6 mx-auto" />
                    <USkeleton class="h-2 w-5/6 mx-auto" />
                  </div>

                  <USkeleton class="h-2 w-4 rounded-xl" />

                </div>
            </UCard>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-6">
            <USkeleton v-for="items in 4" :key="items" class="h-18 rounded-xl border border-muted"/>
          </div>
          
        <!-- Skeleton tabla -->
        <UCard class="overflow-hidden">
          <div class="bg-accented px-4 py-3 rounded-tr-xl rounded-tl-xl">
            <USkeleton class="h-4 w-32" />
          </div>

          <div class="space-y-2">
            <div
              v-for="i in 5"
              :key="i"
              class="grid grid-cols-3 gap-4 px-4 py-3"
            >
              <USkeleton class="h-4 w-24" />
              <USkeleton class="h-4 w-32" />
              <USkeleton class="h-4 w-16" />
            </div>
          </div>
        </UCard>
      </PageLoader>

      <!-- ERROR -->
      <UAlert
        v-else-if="error"
        color="error"
        variant="soft"
        icon="i-lucide-alert-triangle"
        title="Error"
        description="No se pudieron cargar los proyectos"
      />

      <!-- EMPTY -->
      <UAlert
        v-else-if="projects.length === 0"
        color="neutral"
        variant="soft"
        title="No hay proyectos"
        description="Crea tu primer proyecto para comenzar."
      />

      <!-- DATA -->
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
      <AdminProjectCard
        v-for="project in projects.filter(p => p.status !== 'trashed')"
        :key="project.id"
        :project="project"
        :soft-delete="softDelete"
        :restore="restore"
        :archive="archive"
      />


      </div>

      <!-- INDICADORES con contadores -->
      <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <UAlert
          color="success"
          variant="soft"
          icon="i-lucide-check-circle"
          :title="`Publicados (${publishedCount()})`"
          description="Visibles públicamente en el sitio."
        />
        <UAlert
          color="warning"
          variant="soft"
          icon="i-lucide-file-edit"
          :title="`Borradores (${draftCount()})`"
          description="Aún no visibles para el público."
        />
        <UAlert
          color="neutral"
          variant="soft"
          icon="i-lucide-archive"
          :title="`Archivados (${archivedCount()})`"
          description="Ya no se muestran pero se conservan."
        />
      </div>

      <!-- PROYECTOS ELIMINADOS -->

      <div v-if="deletedProjects.length" class="mt-8 space-y-4">
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-trash-2" class="text-error w-5 h-5" />
          <h2 class="text-lg font-semibold text-highlighted">
            Proyectos eliminados ({{ deletedProjects.length }})
          </h2>
        </div>

        <div class="border border-accented rounded-lg overflow-hidden bg-elevated">
          <UTable
            :columns="adminColumns"
            :data="deletedProjects"
            class="flex-1"
            :ui="{
              th: 'bg-accented w-fit text-left',
              td: 'py-3 text-left'
            }"
          />
        </div>
      </div>

      <!-- MODAL ELIMINACIÓN PERMANENTE -->
      <UModal
        v-model:open="showDeleteModal"
        title="Eliminar proyecto permanentemente"
        description="Esta acción es irreversible. El proyecto será eliminado de forma permanente."
      >
        <template #body>
          <div class="flex items-start gap-3 p-2">
            <div class="flex items-center justify-center w-10 h-10 rounded-full bg-error/10">
              <UIcon name="i-lucide-alert-triangle" class="w-5 h-5 text-error" />
            </div>
            <p class="text-sm text-muted flex-1 pt-1.5">
              Una vez eliminado, no podrás recuperar este proyecto. Todos los datos asociados se perderán permanentemente.
            </p>
          </div>
        </template>

        <template #footer>
          <div class="flex justify-end gap-2 w-full">
            <UButton
              color="neutral"
              variant="outline"
              label="Cancelar"
              @click="showDeleteModal = false"
            />
            <UButton
              color="error"
              icon="i-lucide-trash-2"
              label="Sí, eliminar permanentemente"
              @click="handlePermanentDelete"
            />
          </div>
        </template>
      </UModal>
    </NuxtLayout>
  </div>
</template>
