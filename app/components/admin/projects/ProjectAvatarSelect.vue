<script setup lang="ts" name="ProjectAvatarSelect">
import { useAdminProjectsLiteQuery } from '~/composables/admin/projects/queries/useAdminProjectsLiteQuery'

const props = defineProps<{
  modelValue: string | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
}>()

const { projects, loading } = useAdminProjectsLiteQuery()

const selectProject = (id: string) => {
  emit(
    'update:modelValue',
    props.modelValue === id ? null : id
  )
}

const isSelected = (id: string) =>
  props.modelValue === id
</script>

<template>
  <div class="space-y-3">
    <div class="text-sm font-medium">
      Related project
    </div>

    <div v-if="loading" class="text-sm text-muted">
      Loading projects…
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 gap-3"
    >
      <button
        v-for="project in projects"
        :key="project.id"
        type="button"
        
        class="flex items-center gap-3 p-3 rounded-lg border transition"
        :class="isSelected(project.id)
          ? 'border-primary bg-primary/5'
          : 'border-accented hover:bg-muted'"
          @click="selectProject(project.id)"
      >
        <!-- Avatar -->
        <UAvatar
          :src="project.thumbnail_url || undefined"
          :alt="project.title"
          size="md"
        />

        <!-- Info -->
        <div class="flex-1 text-left">
          <div class="font-medium">
            {{ project.title }}
          </div>
          <div class="text-xs text-muted capitalize">
            {{ project.status }}
          </div>
        </div>

        <!-- Selected indicator -->
        <UIcon
          v-if="isSelected(project.id)"
          name="i-lucide-check-circle"
          class="text-primary size-5"
        />
      </button>
    </div>

    <p class="text-xs text-muted">
      Optional. An experience can be linked to a project.
    </p>
  </div>
</template>
