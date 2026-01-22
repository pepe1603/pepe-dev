<script setup lang="ts">
import { h } from 'vue'
import { useRouter } from 'vue-router'
import type { TableColumn } from '@nuxt/ui'
import { useAdminTechnologiesQuery } from '~/composables/admin/technologies/queries/useAdminTechnologiesQuery'

import type { Tables } from '~/types/database.types'
import { useDeleteTechnologyUseCase } from '~/composables/admin/technologies/usecases/useDeleteTechnologyUseCase'

type Technology = Tables<'technologies'>

definePageMeta({
  layout: false,
  middleware: 'admin-auth',
  name: 'technologies'
})

const UAvatar = resolveComponent('UAvatar')
const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')

const router = useRouter()
const { technologies, loading, error, refetch } = useAdminTechnologiesQuery()

const { deleteTechnology, loading: deleting, success: deleteSuccess } = useDeleteTechnologyUseCase()


const columns: TableColumn<Technology>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
    meta: {
      class: {
        td: 'font-medium'
      }
    }
  },
  {
    accessorKey: 'icon',
    header: 'Icono',
    cell: ({ row }) => {
      return h(UAvatar, {
        src: row.original.icon,
        size: 'xl',
        alt: `${row.original.name} icon`
      },{
        fallback: () =>
        h('span', { class: 'text-xs text-muted' }, row.original.name[0])
      })
    }
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => {
      const statusColors = {
        published: 'success',
        draft: 'warning',
        archived: 'neutral'
      } as const

      const status = row.original.status
      const color = statusColors[status as keyof typeof statusColors] || 'neutral'

      return h(UBadge, {
        color,
        variant: 'subtle',
        class: 'capitalize'
      }, () => status)
    }
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      return h('div', { class: 'flex gap-2' }, [
        h(UButton, {
          size: 'xs',
          variant: 'link',
          icon: 'i-lucide-pencil',
          onClick: () => goToEdit(row.original.id)
        }),
        h(UButton, {
          size: 'xs',
          variant: 'link',
          color: 'error',
          icon: 'i-lucide-trash',
          onClick: () => openDeleteModal(row.original.id, row.original.name)
        })
      ])
    }
  }

]

onActivated(() => {
  refetch?.()
})

const goToCreate = () => router.push('/admin/technologies/new')
const goToEdit = (id: string) => {
  router.push(`/admin/technologies/${id}`)
}



// Estado para el modal
const isDeleteModalOpen = ref(false)
const pendingDeleteId = ref<string | null>(null)
const pendingDeleteName = ref<string>('')

// Funciones
const openDeleteModal = (id: string, name: string) => {
  pendingDeleteId.value = id
  pendingDeleteName.value = name
  isDeleteModalOpen.value = true
}

const closeDeleteModal = () => {
  pendingDeleteId.value = null
  pendingDeleteName.value = ''
  isDeleteModalOpen.value = false
}

const confirmDelete = async () => {
  if (!pendingDeleteId.value) return
  await deleteTechnology(pendingDeleteId.value)
  if (deleteSuccess.value) {
    refetch?.()
    closeDeleteModal()
  }
}

</script>

<template>
<div>
    <NuxtLayout
    name="admin"
    title="Technologies"
    description="Gestiona las Tecnologías, herramientas y frameworks que utilizas en tus proyectos"
  >
    <template #page-actions>
      <UButton
        color="primary"
        icon="i-lucide-plus"
        size="sm"
        @click="goToCreate()"
      >
        Nueva tecnología
      </UButton>
    </template>

    <UAlert
      color="info"
      variant="soft"
      icon="i-lucide-info"
      title="¿Qué es una Tecnología?"
      description="Las tecnologías son herramientas concretas (frameworks, librerías o servicios) que utilizas en tus proyectos, como Vue, Angular o Supabase.
                  No tienen nivel ni categoría como las habilidades.
                  "
    />


    <!-- Loading -->
    <div v-if="loading" class="flex flex-col items-center gap-2 py-16 text-gray-500">
      <UIcon name="i-lucide-loader" class="animate-spin text-2xl" />
      <span>Cargando tecnologías...</span>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="py-16 text-center text-red-500">
      <UIcon name="i-lucide-alert-triangle" class="mx-auto mb-2 text-2xl" />
      {{ error }}
    </div>

    <!-- Empty -->
    <div
      v-else-if="technologies.length === 0"
      class="flex flex-col items-center gap-3 py-16 text-gray-500"
    >
      <UIcon name="i-lucide-box" class="text-3xl" />
      <p>No hay tecnologías registradas</p>
      <UButton
        variant="soft"
        color="primary"
        size="sm"
        @click="goToCreate()"
      >
        Crear primera tecnología
      </UButton>
    </div>

    <!-- Table -->
    <div
      v-else
      class="border border-accented rounded-lg overflow-hidden bg-elevated"
    >
      <UTable
        :data="technologies"
        :columns="columns"
        :ui="{
          th: 'bg-accented text-left',
          td: 'py-3'
        }"
        @row-click="row => router.push(`/admin/technologies/${row.id}`)"
      />

    </div>
  </NuxtLayout>
    <UModal
    v-model:open="isDeleteModalOpen"
    title="Confirm Delete"
    :ui="{ footer: 'flex justify-end gap-2' }"
  >
    <template #body>
      <p class="text-sm text-muted">
        Are you sure you want to delete <strong>{{ pendingDeleteName }}</strong>?
        This action cannot be undone.
      </p>
    </template>

    <template #footer>
      <UButton variant="ghost" color="neutral" @click="closeDeleteModal">Cancel</UButton>
      <UButton color="error" :loading="deleting" @click="confirmDelete">Delete</UButton>
    </template>
  </UModal>

</div>
</template>
