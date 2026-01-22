<script setup lang="ts" name="ExperienceStatusPanel">
import { computed, ref, watch } from 'vue'
import type { RecordStatus } from '~/composables/admin/experiences/models/ExperienceFormModel'
import { useUpdateExperienceStatusUseCase } from '~/composables/admin/experiences/usecases/useUpdateExperienceStatusUseCase'

const props = defineProps<{
  id: string
  status: RecordStatus
}>()

const emit = defineEmits<{
  (e: 'updated', value: RecordStatus): void
}>()

const { updateStatus, loading, error, success } =
  useUpdateExperienceStatusUseCase()

/**
 * Local synced state
 */
const currentStatus = ref<RecordStatus>(props.status)

watch(
  () => props.status,
  (value) => {
    currentStatus.value = value
  }
)

/**
 * Valid transitions
 */
type StatusAction =
  | 'publish'
  | 'unpublish'
  | 'archive'
  | 'restore'

const availableActions = computed<StatusAction[]>(() => {
  switch (currentStatus.value) {
    case 'draft':
      return ['publish', 'archive']
    case 'published':
      return ['unpublish', 'archive']
    case 'archived':
      return ['restore']
    default:
      return []
  }
})

const actionToStatus = (action: StatusAction): RecordStatus => {
  switch (action) {
    case 'publish':
      return 'published'
    case 'unpublish':
      return 'draft'
    case 'archive':
      return 'archived'
    case 'restore':
      return 'draft'
  }
}

/**
 * Modal state
 */
const isModalOpen = ref(false)
const pendingAction = ref<StatusAction | null>(null)

const openConfirm = (action: StatusAction) => {
  pendingAction.value = action
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  pendingAction.value = null
}

const confirmAction = async () => {
  if (!pendingAction.value) return

  const nextStatus = actionToStatus(pendingAction.value)
  await updateStatus(props.id, nextStatus)

  if (success.value) {
    currentStatus.value = nextStatus
    emit('updated', nextStatus)
    closeModal()
  }
}

/**
 * Labels
 */
const actionLabels: Record<StatusAction, string> = {
  publish: 'Publish',
  unpublish: 'Unpublish',
  archive: 'Archive',
  restore: 'Restore'
}
</script>

<template>
  <div class="border border-accented rounded-lg p-5 bg-muted/30 space-y-4">
    <div class="flex items-center justify-between">
      <div>
        <div class="font-medium">Status</div>
        <div class="text-xs text-muted capitalize">
          Current: {{ currentStatus }}
        </div>
      </div>

      <UBadge
        :color="
          currentStatus === 'published'
            ? 'success'
            : currentStatus === 'archived'
              ? 'error'
              : 'warning'
        "
        variant="soft"
        class="capitalize"
      >
        {{ currentStatus }}
      </UBadge>
    </div>

    <!-- Actions -->
    <div v-if="availableActions.length" class="flex gap-2 flex-wrap">
      <UButton
        v-for="action in availableActions"
        :key="action"
        size="sm"
        variant="soft"
        :color="
          action === 'publish'
            ? 'success'
            : action === 'archive'
              ? 'error'
              : 'neutral'
        "
        @click="openConfirm(action)"
      >
        {{ actionLabels[action] }}
      </UButton>
    </div>

    <div v-else class="text-xs text-muted">
      This experience can no longer change status.
    </div>

    <UAlert
      v-if="error"
      color="error"
      variant="soft"
      icon="i-lucide-alert-triangle"
      :title="error"
    />

    <!-- Confirm modal -->
    <UModal
      v-model:open="isModalOpen"
      title="Confirm action"
      :ui="{ footer: 'flex justify-end gap-2' }"
    >
      <template #body>
        <p class="text-sm text-muted">
          Are you sure you want to
          <strong class="capitalize text-highlighted">
            {{ pendingAction }}
          </strong>
          this experience?
        </p>
      </template>

      <template #footer>
        <UButton variant="ghost" color="neutral" @click="closeModal">
          Cancel
        </UButton>

        <UButton color="primary" :loading="loading" @click="confirmAction">
          Confirm
        </UButton>
      </template>
    </UModal>
  </div>
</template>
