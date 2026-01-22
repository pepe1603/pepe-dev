<!-- app/components/admin/projects/media_project/ProjectMediaUpload.vue -->
<script setup lang="ts" name="ProjectMediaUpload">
import { ref, onBeforeUnmount } from 'vue'
import { useSupabaseClient } from '#imports'
import { useUploadService } from '~/composables/uploads/useUploadService'
import type { MediaType } from '~/constants/mediaTypes'

const props = defineProps<{
  projectSlug: string
  accept?: string
  initialUrl?: string
}>()

const emit = defineEmits<{
  (
    e: 'uploaded',
    payload: {
      url: string
      name: string
      type: MediaType
    }
  ): void
}>()

const supabase = useSupabaseClient()
const { upload } = useUploadService()

const fileInput = ref<HTMLInputElement | null>(null)
const previewUrl = ref<string | null>(props.initialUrl ?? null)
const uploading = ref(false)
const error = ref<string | null>(null)

/**
 * Detect media type from file
 */
const detectMediaType = (file: File): MediaType => {
  if (file.type.startsWith('image/')) return 'image'
  if (file.type.startsWith('video/')) return 'video'
  if (file.type.startsWith('audio/')) return 'audio'
  if (file.type === 'application/pdf') return 'pdf'
  return 'image'
}

/**
 * Handle file upload
 */
const onFileChange = async (event: Event) => {
  const file = (event.target as HTMLInputElement)?.files?.[0]
  if (!file) return

  uploading.value = true
  error.value = null

  // 🔍 Preview inmediato
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }
  previewUrl.value = URL.createObjectURL(file)

  try {
    // 1️⃣ Upload físico
    const result = await upload(file, 'project-media', {
      projectSlug: props.projectSlug,
      filename: file.name,
    })

    // 2️⃣ Resolver URL pública (para preview y DB)
    const { data } = supabase.storage
      .from('project-media')
      .getPublicUrl(result.path)

    if (!data?.publicUrl) {
      throw new Error('No se pudo obtener la URL pública del archivo')
    }

    console.log('Bucket URL:', data.publicUrl)

    console.log('Bucket data:', data)


    // 3️⃣ Emitir al panel (DB layer)
    emit('uploaded', {
      url: data.publicUrl,
      name: file.name,
      type: detectMediaType(file),
    })
  } catch (e: any) {
    console.error(e)
    error.value = e?.message ?? 'Upload failed'
  } finally {
    uploading.value = false
  }
}

/**
 * Cleanup preview blob
 */
onBeforeUnmount(() => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }
})
</script>

<template>
  <div class="space-y-2">
    <!-- Preview -->
    <div
      class="relative w-full h-52 rounded border border-accented border-dashed border-spacing-20 flex items-center justify-center overflow-hidden"
    >
      <img
        v-if="previewUrl"
        :src="previewUrl"
        class="w-full h-full object-cover"
      />
      <div v-else class="text-sm text-muted">
        Sin archivo
      </div>

      <div
        v-if="uploading"
        class="absolute inset-0 bg-black/40 flex items-center justify-center"
      >
        <UIcon
          name="i-lucide-loader-circle"
          class="size-6 text-white animate-spin"
        />
      </div>
    </div>

    <!-- Input hidden -->
    <input
      ref="fileInput"
      type="file"
      :accept="accept"
      class="hidden"
      @change="onFileChange"
    />

    <!-- Action -->
    <UButton
      size="sm"
      color="primary"
      :loading="uploading"
      @click="fileInput?.click()"
    >
      Subir archivo
    </UButton>

    <!-- Error -->
    <UAlert
      v-if="error"
      color="error"
      variant="soft"
      :title="error"
    />
  </div>
</template>
