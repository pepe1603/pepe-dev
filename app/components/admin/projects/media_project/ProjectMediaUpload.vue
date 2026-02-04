<!-- app/components/admin/projects/media_project/ProjectMediaUpload.vue -->
<script setup lang="ts" name="ProjectMediaUpload">
import { ref, onBeforeUnmount } from 'vue'
import { useUploadService } from '~/composables/uploads/useUploadService'

const props = defineProps<{
  projectSlug: string
}>()

const emit = defineEmits<{
  (e: 'uploaded', payload: { url: string; name: string }): void
}>()

const { upload } = useUploadService()

const fileInput = ref<HTMLInputElement | null>(null)

const file = ref<File | null>(null)
const previewUrl = ref<string | null>(null)
const filename = ref('')
const uploading = ref(false)
const error = ref<string | null>(null)

/* ---------------- FILE SELECT ---------------- */
const onFileSelect = (files: FileList | null) => {
  if (!files?.[0]) return

  cleanup()

  file.value = files[0]
  filename.value = files[0].name.replace(/\.[^/.]+$/, '')
  previewUrl.value = URL.createObjectURL(files[0])
}

/* ---------------- UPLOAD ---------------- */
const uploadImage = async () => {
  if (!file.value) return

  uploading.value = true
  error.value = null

  try {
    const extension = file.value.name.split('.').pop()!

    const result = await upload(file.value, 'project-media', {
      projectSlug: props.projectSlug,
      filename: `${filename.value}.${extension}`
    })

    if (!result.publicUrl) {
      throw new Error('No se pudo obtener URL pública')
    }

    emit('uploaded', {
      url: result.publicUrl,
      name: filename.value
    })

    cleanup()
  } catch (e: any) {
    error.value = e?.message ?? 'Error al subir imagen'
  } finally {
    uploading.value = false
  }
}

/* ---------------- CLEANUP ---------------- */
const cleanup = () => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }

  file.value = null
  previewUrl.value = null
  filename.value = ''
}

onBeforeUnmount(cleanup)
</script>

<template>
  <div class="space-y-4">

    <!-- CONTENEDOR ÚNICO: Drag & Drop + Preview -->
    <div
      class="relative w-full h-64 rounded-xl border-2 border-dashed
             border-gray-300 dark:border-gray-700
             flex items-center justify-center text-center
             transition-all duration-300
             hover:border-primary-500 hover:bg-primary-50/40
             dark:hover:bg-primary-900/20
             bg-gray-50 dark:bg-gray-900 overflow-hidden"
    >
      <!-- Estado vacío -->
      <div v-if="!previewUrl && !uploading" class="pointer-events-none">
        <UIcon
          name="i-lucide-image-plus"
          class="mx-auto mb-2 size-8 text-gray-400"
        />
        <p class="text-sm text-gray-500">
          Arrastra una imagen aquí o haz click para seleccionarla
        </p>
      </div>

      <!-- Preview -->
      <img
        v-if="previewUrl"
        :src="previewUrl"
        class="absolute inset-0 w-full h-full object-cover"
      />

      <!-- Loader -->
      <div
        v-if="uploading"
        class="absolute inset-0 bg-black/40 flex items-center justify-center"
      >
        <UIcon
          name="i-lucide-loader-circle"
          class="size-8 text-primary animate-spin"
        />
      </div>

      <!-- Input invisible (drag + click) -->
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        @change="onFileSelect(($event.target as HTMLInputElement).files)"
      />
    </div>

    <!-- Leyenda / descripción -->
    <p class="text-sm text-muted">
      Puedes arrastrar una imagen o usar el botón <strong>Elegir imagen</strong>.
      La imagen no se guardará hasta que confirmes.
    </p>

    <!-- Nombre del archivo -->
    <UFormField label="Nombre del archivo (opcional)">
      <UInput
        v-if="file"
        v-model="filename"
        placeholder="Nombre de la imagen"
        class="w-full"
      />
    </UFormField>

    <!-- Acciones (SE QUEDAN) -->
    <div class="flex gap-2">
      <UButton
        variant="soft"
        icon="i-lucide-image-plus"
        @click="fileInput?.click()"
      >
        Elegir imagen
      </UButton>

      <UButton
        v-if="file"
        color="primary"
        :loading="uploading"
        icon="i-lucide-upload"
        @click="uploadImage"
      >
        Guardar en la galería
      </UButton>

      <UButton
        v-if="file"
        variant="subtle"
        color="neutral"
        icon="i-lucide-x"
        @click="cleanup"
      >
        Cancelar
      </UButton>
    </div>

    <!-- Error -->
    <UAlert
      v-if="error"
      color="error"
      variant="soft"
      :title="error"
    />

  </div>
</template>
