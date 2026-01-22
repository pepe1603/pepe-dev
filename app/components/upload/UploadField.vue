<script setup lang="ts" name="UploadField">
import { ref, computed, onBeforeUnmount } from 'vue'
import { useUploadService } from '~/composables/uploads/useUploadService'
import type { UploadTarget } from '~/composables/uploads/upload.types'

const props = defineProps<{
  label: string
  modelValue: string | null
  target: UploadTarget
  projectSlug?: string
  help?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
}>()

const { upload } = useUploadService()

const loading = ref(false)
const error = ref<string | null>(null)

// 🔑 NUEVO
const localPreview = ref<string | null>(null)

const previewSrc = computed(() =>
  localPreview.value || props.modelValue
)

const onFileChange = async (files: FileList | null) => {
  if (!files?.[0]) return

  const file = files[0]

  // 1️⃣ Preview inmediata
  localPreview.value = URL.createObjectURL(file)

  loading.value = true
  error.value = null

  try {
    const result = await upload(file, props.target, {
      projectSlug: props.projectSlug
    })

    // 2️⃣ Persistimos URL final
    emit('update:modelValue', result.publicUrl)
  } catch (e: any) {
    error.value = e?.message ?? 'Upload failed'
    localPreview.value = null
  } finally {
    loading.value = false
  }
}

const removeImage = () => {
  localPreview.value = null
  emit('update:modelValue', null)
}

// 🧹 Limpieza de memoria
onBeforeUnmount(() => {
  if (localPreview.value) {
    URL.revokeObjectURL(localPreview.value)
  }
})
</script>

<template>
  <UFormField :label="label" :help="help">
    <div class="space-y-4">

      <!-- Error -->
      <UAlert
        v-if="error"
        color="error"
        variant="soft"
        icon="i-lucide-alert-triangle"
        :title="error"
      />

      <!-- Preview -->
      <div
        v-if="previewSrc"
        class="relative rounded-lg overflow-hidden border border-accented bg-muted"
      >
        <img
          :src="previewSrc"
          alt="Image preview"
          class="w-full max-h-60 object-cover"
        />

        <div
          v-if="!loading"
          class="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex items-center justify-center gap-2"
        >
          <UButton
            size="sm"
            color="neutral"
            variant="solid"
            icon="i-lucide-refresh-cw"
          >
            Replace
          </UButton>

          <UButton
            size="sm"
            color="error"
            variant="solid"
            icon="i-lucide-trash"
            @click="removeImage"
          >
            Remove
          </UButton>
        </div>

        <!-- Loading overlay -->
        <div
          v-if="loading"
          class="absolute inset-0 bg-black/50 flex items-center justify-center"
        >
          <UIcon
            name="i-lucide-loader-circle"
            class="size-8 text-white animate-spin"
          />
        </div>
      </div>

      <!-- Input -->
      <UInput
        type="file"
        accept="image/*"
        icon="i-lucide-upload"
        :disabled="loading"
        @change="onFileChange(($event.target as HTMLInputElement).files)"
      />

    </div>
  </UFormField>
</template>
