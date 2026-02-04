<!-- components/admin/projects/media_project/ProjectMediaEditModal.vue -->
<script setup lang="ts" name="ProjectMediaEditModal">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import type { ProjectMediaItemModel } from '~/composables/admin/projects/media_project/models/ProjectMediaItemModel'

const props = defineProps<{
  modelValue: boolean
  media: ProjectMediaItemModel | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'save', value: ProjectMediaItemModel): void
}>()

const localItem = ref<ProjectMediaItemModel | null>(null)

/* ---------------- SYNC MEDIA ---------------- */
watch(
  () => props.media,
  value => {
    localItem.value = value ? { ...value } : null
  },
  { immediate: true }
)

/* ---------------- ACTIONS ---------------- */
const close = () => emit('update:modelValue', false)

const save = () => {
  if (!localItem.value) return
  emit('save', localItem.value)
  close()
}

/* ---------------- ESC HANDLER ---------------- */
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') close()
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <!-- Overlay -->
      <div
        class="absolute inset-0 bg-black/40 backdrop-blur-sm"
        @click="close"
      />

      <!-- Modal -->
      <UCard
        class="relative z-10 w-full max-w-lg mx-4"
      >
        <template #header>
          <h3 class="text-lg font-semibold">
            Editar imagen
          </h3>
        </template>

        <div v-if="localItem" class="space-y-4">
          <!-- Preview -->
          <img
            :src="localItem.url"
            class="w-full h-48 object-cover rounded-md"
          />

          <UInput
            v-model="localItem.name"
            label="Nombre"
            placeholder="Nombre interno"
            disabled
            class="w-full"
          />

          <UInput
            v-model="localItem.alt"
            label="Alt text"
            placeholder="Accesibilidad / SEO"
            class="w-full"
          />

          <UTextarea
            v-model="localItem.caption"
            label="Caption"
            placeholder="Descripción opcional"
            class="w-full"
          />
        </div>

        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton
              variant="soft"
              color="neutral"
              @click="close"
            >
              Cancelar
            </UButton>

            <UButton
              color="primary"
              icon="i-lucide-save"
              @click="save"
            >
              Guardar
            </UButton>
          </div>
        </template>
      </UCard>
    </div>
  </Teleport>
</template>
