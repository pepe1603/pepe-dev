<!-- //app/pages/admin/skills/index.vue -->
<script setup lang="ts">
import { h } from 'vue'
import { useRouter } from 'vue-router'
import type { TableColumn } from '@nuxt/ui'
import { useAdminSkillsQuery } from '~/composables/admin/skills/queries/useAdminSkillsQuery'
import { useDeleteSkillUseCase } from '~/composables/admin/skills/usecases/useDeleteSkillUseCase'
import type { Tables } from '~/types/database.types'

type Skill = Tables<'skills'>

definePageMeta({
  layout: false,
  middleware: 'admin-auth',
  name: 'skills'
})

const router = useRouter()

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')

const { skills, loading, error, refetch } = useAdminSkillsQuery()
const { remove: deleteSkill, loading: deleting, success: deleteSuccess } = useDeleteSkillUseCase()

onActivated(() => {
  refetch?.()
})

/* -------- Stats por nivel -------- */
const levelStats = computed(() => {
  const base = {
    beginner: 0,
    intermediate: 0,
    advanced: 0,
    expert: 0
  }

  for (const skill of skills.value ?? []) {
    if (skill.level && skill.level in base) {
      base[skill.level as keyof typeof base]++
    }
  }

  return base
})

/* -------- Orden simple -------- */
const sortedSkills = computed(() => {
  return [...(skills.value ?? [])].sort((a, b) => {
    const catA = a.category ?? 'zzz'
    const catB = b.category ?? 'zzz'

    if (catA !== catB) return catA.localeCompare(catB)
    return a.name.localeCompare(b.name)
  })
})


/* -------- Columns -------- */
const columns: TableColumn<Skill>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
    meta: { class: { td: 'font-medium' } }
  },
  {
    accessorKey: 'category',
    header: 'Categoría',
    cell: ({ row }) =>
      h('span', { class: 'capitalize text-muted' }, row.original.category ?? '—')
  },
  {
    accessorKey: 'level',
    header: 'Nivel',
    cell: ({ row }) => {
      const colors = {
        beginner: 'neutral',
        intermediate: 'info',
        advanced: 'warning',
        expert: 'success'
      } as const

      const level = row.original.level
      return h(
        UBadge,
        { color: colors[level as keyof typeof colors], variant: 'subtle' },
        () => level
      )
    }
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => {
      const colors = {
        published: 'success',
        draft: 'warning',
        archived: 'neutral'
      } as const

      return h(
        UBadge,
        { color: colors[row.original.status as keyof typeof colors], variant: 'subtle' },
        () => row.original.status
      )
    }
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
        variant: 'link',
        icon: 'i-lucide-trash',
        color: 'error',
        onClick: () => openDeleteModal(row.original.id)
      })
    ])
  }

]

const goToCreate = () => router.push('/admin/skills/new')
const goToEdit = (id: string) => {
  router.push(`/admin/skills/${id}`)
}

/** Modal state */
const isModalOpen = ref(false)
const pendingDeleteId = ref<string | null>(null)

const openDeleteModal = (id: string) => {
  pendingDeleteId.value = id
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  pendingDeleteId.value = null
}

const confirmDelete = async () => {
  if (!pendingDeleteId.value) return

  await deleteSkill(pendingDeleteId.value)

  if (deleteSuccess.value) {
    // Refrescar tabla
    await refetch?.()
    closeModal()
  }
}
</script>


<template>
  <div>
    <NuxtLayout
      name="admin"
      title="Skills"
      description="Gestiona tus skills para mostrarlas a reclutadores y al público"
    >
      <template #page-actions>
        <UButton
          color="primary"
          icon="i-lucide-plus"
          size="sm"
          @click="goToCreate"
        >
          Nueva skill
        </UButton>
      </template>

      <UAlert
        color="info"
        variant="soft"
        icon="i-lucide-info"
        title="¿Qué es una Skill?"
        description="Las skills representan capacidades profesionales (por ejemplo: Arquitectura Frontend, Testing, Clean Code). No representan herramientas ni frameworks."
      />


      <!-- Loading -->
      <div
        v-if="loading"
        class="flex flex-col items-center gap-2 py-16 text-gray-500"
      >
        <UIcon name="i-lucide-loader" class="animate-spin text-2xl" />
        <span>Cargando skills...</span>
      </div>

      <!-- Error -->
      <div
        v-else-if="error"
        class="py-16 text-center text-red-500"
      >
        <UIcon name="i-lucide-alert-triangle" class="mx-auto mb-2 text-2xl" />
        {{ error }}
      </div>

      <!-- Empty -->
      <div
        v-else-if="!skills || skills.length === 0"
        class="flex flex-col items-center gap-3 py-16 text-gray-500"
      >
        <UIcon name="i-lucide-folder-open" class="text-3xl" />
        <p>No hay skills registradas todavía</p>
        <UButton
          variant="soft"
          color="primary"
          size="sm"
          @click="goToCreate"
        >
          Crear primera skill
        </UButton>
      </div>

      <!-- Table -->
      <div
        v-else
        class="border border-accented rounded-lg overflow-hidden bg-elevated"
      >
        <UTable
          :data="sortedSkills"
          :columns="columns"
          :ui="{ th: 'bg-accented text-left', td: 'py-3' }"
          @row-click="goToEdit"
        />

      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <UAlert
          color="neutral"
          variant="soft"
          :title="`Beginner (${levelStats.beginner})`"
        />
        <UAlert
          color="info"
          variant="soft"
          :title="`Intermediate (${levelStats.intermediate})`"
        />
        <UAlert
          color="warning"
          variant="soft"
          :title="`Advanced (${levelStats.advanced})`"
        />
        <UAlert
          color="success"
          variant="soft"
          :title="`Expert (${levelStats.expert})`"
        />
      </div>

    </NuxtLayout>
      <UModal
      v-model:open="isModalOpen"
      title="Confirm delete"
      :ui="{ footer: 'flex justify-end gap-2' }"
    >
      <template #body>
        <p class="text-sm text-muted">
          Are you sure you want to delete this skill? This action cannot be undone.
        </p>
      </template>

      <template #footer>
        <UButton variant="ghost" color="neutral" @click="closeModal">
          Cancel
        </UButton>

        <UButton color="error" :loading="deleting" @click="confirmDelete">
          Delete
        </UButton>
      </template>
    </UModal>

  </div>
</template>
