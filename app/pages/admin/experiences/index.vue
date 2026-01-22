<!-- //app/pages/admin/expericness/index.vue -->
<script setup lang="ts">
import { h } from 'vue'
import { useRouter } from 'vue-router'
import type { TableColumn } from '@nuxt/ui'
import type { Tables } from '~/types/database.types'
import { useAdminExperiencesQuery } from '~/composables/admin/experiences/queries/useAdminExperiencesQuery'
import { useDeleteExperienceUseCase } from '~/composables/admin/experiences/usecases/useDeleteExperienceUseCase'

type Experience = Tables<'experiences'>

definePageMeta({
  layout: false,
  middleware: 'admin-auth',
})

const { remove } = useDeleteExperienceUseCase()

const confirmDelete = async (id: string) => {
  if (!confirm('¿Eliminar esta experiencia de forma definitiva?')) return

  const ok = await remove(id)
  if (ok) await refetch()
}


const router = useRouter()
const { experiences, loading, error, refetch } = useAdminExperiencesQuery()

const goToCreate = () => {
  router.push('/admin/experiences/new')
}

const goToEdit = (id: string) => {
  router.push(`/admin/experiences/${id}`)
}

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')

const columns: TableColumn<Experience>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) =>
      h('div', { class: 'font-medium' }, [
        row.original.title,
        row.original.subtitle
          ? h('div', { class: 'text-xs text-muted' }, row.original.subtitle)
          : null
      ])
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) =>
      h('span', { class: 'capitalize' }, row.original.type)
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) =>
      h(
        UBadge,
        {
          color: row.original.status === 'published' ? 'success' : 'warning',
          variant: 'soft'
        },
        () => row.original.status
      )
  },
  {
    id: 'period',
    header: 'Period',
    cell: ({ row }) =>
      h(
        'span',
        { class: 'text-xs text-muted' },
        row.original.end_date
          ? `${row.original.start_date} → ${row.original.end_date}`
          : row.original.start_date
      )
  },
{
  id: 'actions',
  header: '',
  cell: ({ row }) =>
    h('div', { class: 'flex gap-2' }, [
      h(UButton, {
        size: 'xs',
        variant: 'link',
        icon: 'i-lucide-pencil',
        onClick: () => goToEdit(row.original.id)
      }),
      h(UButton, {
        size: 'xs',
        color: 'error',
        variant: 'link',
        icon: 'i-lucide-trash',
        onClick: () => confirmDelete(row.original.id)
      })
    ])
}

]
</script>

<template>
  <div>
    <NuxtLayout
      name="admin"
      title="Experiencias"
      description="Administra tus experiencias profesionales"
    >
      <template #page-actions>
        <UButton
          color="primary"
          icon="i-lucide-plus"
          @click="goToCreate"
        >
          New experience
        </UButton>
      </template>

      <!-- Loading -->
      <div v-if="loading" class="py-12 text-center">
        <UIcon
          name="i-lucide-loader-circle"
          class="size-8 animate-spin text-primary mx-auto"
        />
      </div>

      <!-- Error -->
      <UAlert
        v-else-if="error"
        color="error"
        variant="soft"
        icon="i-lucide-alert-triangle"
        :title="error"
      />

      <!-- Empty -->
      <UAlert
        v-else-if="experiences.length === 0"
        color="neutral"
        variant="soft"
        title="No experiences yet"
        description="Create your first experience to get started."
      />

      <!-- TABLE (UTable) -->
      <div
        v-else
        class="border border-accented rounded-lg overflow-hidden bg-elevated"
      >
        <UTable
          :columns="columns"
          :data="experiences"
          :ui="{
            th: 'bg-accented text-left',
            td: 'py-3'
          }"
          @row-click="row => goToEdit(row.id)"
        />
      </div>
    </NuxtLayout>
  </div>
</template>
