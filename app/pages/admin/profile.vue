<script setup lang="ts">
import type { ProfileFormModel } from '~/composables/admin/profile/models/ProfileFormModel'
import { useAdminProfileQuery } from '~/composables/admin/profile/queries/useAdminProfileQuery'
import { useUpdateProfileUseCase } from '~/composables/admin/profile/usecases/useUpdateProfileUseCase'
import { useUploadProfileMediaUseCase } from '~/composables/admin/profile/usecases/useUploadProfileMediaUseCase'

definePageMeta({
  middleware: 'admin-auth',
  layout: 'admin',
  title: 'Mi Perfil',
  description: 'Edita tu información personal y profesional',
  name: 'admin-profile-page'
})

const toast = useToast()

/* ===============================
   QUERY (SOURCE OF TRUTH)
================================ */
const { form, loading, refetch: _refetch } = useAdminProfileQuery()

/* ===============================
   LOCAL STATE
================================ */
const originalForm = ref<ProfileFormModel | null>(null)
const uploadingAvatar = ref(false)
const uploadingCv = ref(false)
/* Avatar: upload | url */
const avatarMode = ref<'upload' | 'url'>('upload')
const avatarUrlInput = ref('')

/* File inputs */
const avatarInput = ref<HTMLInputElement | null>(null)
const cvInput = ref<HTMLInputElement | null>(null)

const selectedAvatarFileName = ref('')
const selectedCvFileName = ref('')


/* ===============================
   HELPERS
================================ */
const cloneForm = (form: ProfileFormModel): ProfileFormModel => ({
  fullName: form.fullName,
  headline: form.headline,
  bio: form.bio,
  location: form.location,
  emailPublic: form.emailPublic,

  avatarUrl: form.avatarUrl,
  avatarFile: null,

  cvUrl: form.cvUrl,
  cvFile: null,

  socials: {
    github: form.socials.github,
    linkedin: form.socials.linkedin,
    twitter: form.socials.twitter,
    website: form.socials.website
  }
})

watch(
  form,
  (value) => {
    if (!value) return
    originalForm.value = cloneForm(value)
    console.log('✅ Perfil listo para editar')
  },
  { immediate: true }
)

/* ===============================
   USE CASES
================================ */
const { updateProfile, loading: saving } = useUpdateProfileUseCase()
const { upload } = useUploadProfileMediaUseCase()

/* ===============================
   VALIDATIONS (UX)
================================ */
const errors = computed<Record<string, string>>(() => {
  if (!form.value) return {}

  const e: Record<string, string> = {}

  if (!form.value.fullName.trim()) {
    e.fullName = 'El nombre es obligatorio'
  }

  if (
    form.value.emailPublic &&
    !/^\S+@\S+\.\S+$/.test(form.value.emailPublic)
  ) {
    e.emailPublic = 'Email inválido'
  }

  return e
})

const isValid = computed(() => Object.keys(errors.value).length === 0)

const hasChanges = computed(() =>
  JSON.stringify(form.value) !== JSON.stringify(originalForm.value)
)

/* ===============================
   ACTIONS
================================ */
const onSave = async () => {
  if (!form.value || !isValid.value) return

  await updateProfile(form.value)
  toast.add({ color: 'success', description: 'Perfil actualizado' })
  originalForm.value = cloneForm(form.value)
}

/* ===============================
   UPLOADS
================================ */
const onAvatarUpload = async (file: File) => {
  if (!file.type.startsWith('image/')) {
    toast.add({ color: 'warning', description: 'Solo imágenes permitidas' })
    return
  }

  uploadingAvatar.value = true
  selectedAvatarFileName.value = file.name  // Guardamos el nombre del archivo

  const url = await upload(file, 'avatar')
  if (url && form.value) {
    form.value.avatarUrl = url
    toast.add({ color: 'success', description: 'Avatar actualizado' })
  }

  uploadingAvatar.value = false
}

const onCvUpload = async (file: File) => {
  if (file.type !== 'application/pdf') {
    toast.add({ color: 'warning', description: 'Solo archivos PDF' })
    return
  }

  uploadingCv.value = true
  selectedCvFileName.value = file.name  // Guardamos el nombre del archivo

  const url = await upload(file, 'cv')
  if (url && form.value) {
    form.value.cvUrl = url
    toast.add({ color: 'success', description: 'CV subido correctamente' })
  }

  uploadingCv.value = false
}

const openAvatarPicker = () => {
  avatarInput.value?.click()
}

const openCvPicker = () => { 
  cvInput.value?.click()
}

//validaciones para avartar url
const validateAndApplyAvatarUrl = async () => {
  try {
    const res = await fetch(avatarUrlInput.value, { method: 'HEAD' })
    const contentType = res.headers.get('content-type') || ''

    if (!res.ok || !contentType.startsWith('image/')) {
      throw new Error()
    }

    form.value!.avatarUrl = avatarUrlInput.value
    avatarUrlInput.value = ''

    toast.add({
      color: 'success',
      description: 'Avatar actualizado por URL'
    })
  } catch {
    toast.add({
      color: 'error',
      description: 'La URL no es válida o no es pública'
    })
  }
}


</script>

<template>
  <UContainer>
    <!-- ===============================
         SKELETON
    ================================ -->
    <div v-if="loading" class="space-y-8 ">
      <UCard>
        <div class="flex items-center gap-6">
          <USkeleton class="w-24 h-24 rounded-full" />
          <div class="space-y-2 flex-1">
            <USkeleton class="h-4 w-1/2" />
            <USkeleton class="h-4 w-1/3" />
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="space-y-4">
          <USkeleton class="h-10 w-full" />
          <USkeleton class="h-10 w-full" />
          <USkeleton class="h-24 w-full" />
        </div>
      </UCard>

      <UCard>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <USkeleton class="h-10 w-full" />
          <USkeleton class="h-10 w-full" />
          <USkeleton class="h-10 w-full" />
          <USkeleton class="h-10 w-full" />
        </div>
      </UCard>
    </div>

    <!-- ===============================
         FORM
    ================================ -->
    <div v-else-if="form" class="space-y-6">

      <!-- Avatar Card -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                <UIcon name="i-heroicons-camera" class="text-xl text-primary" />
              </div>
              <div>
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Foto de Perfil</h2>
                <p class="text-sm text-gray-500 dark:text-gray-400">Personaliza tu imagen profesional</p>
              </div>
            </div>
            <UBadge v-if="uploadingAvatar" color="info" variant="soft">
              <UIcon name="i-heroicons-arrow-path" class="animate-spin" />
              Subiendo...
            </UBadge>
          </div>
        </template>

        <div class="flex flex-col sm:flex-row items-center gap-8 py-2">
          <div class="relative">
            <UAvatar
              :src="form.avatarUrl || '/avatar-placeholder.png'"
              :alt="form.fullName"
              size="3xl"
              :ui="{ root: uploadingAvatar ? 'opacity-50 transition-opacity' : '' }"
            />
            <UBadge
              v-if="form.avatarUrl && !uploadingAvatar"
              color="success"
              variant="solid"
              class="absolute -bottom-2 -right-2 shadow-lg"
              size="sm"
            >
              <UIcon name="i-heroicons-check-circle-20-solid" />
            </UBadge>
          </div>

          <div class="flex-1 space-y-3 w-full">
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Sube una imagen que te represente profesionalmente. Se recomienda usar una foto de alta calidad con fondo neutro.
            </p>

            <div class="flex items-center gap-3">
              <UTabs
                v-model="avatarMode"
                :items="[
                  { label: 'Subir archivo', value: 'upload' },
                  { label: 'Usar URL', value: 'url' }
                ]"
              />

              <div class="text-xs text-muted">
                <p>JPG, PNG o GIF</p>
                <p>Max. 5MB</p>
              </div>
            </div>

            <!-- Upload -->
            <div v-if="avatarMode === 'upload'" class="mt-2">
              <UButton
                color="neutral"
                icon="i-heroicons-photo"
                :loading="uploadingAvatar"
                @click="openAvatarPicker"
              >
                Cambiar foto
              </UButton>
              <p v-if="selectedAvatarFileName" class="text-sm text-gray-500 mt-1 truncate">
                Archivo seleccionado: {{ selectedAvatarFileName }}
              </p>

              <input
                ref="avatarInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="e => e.target.files && onAvatarUpload(e.target.files[0])"
              />
            </div>

            <!-- URL -->
            <div v-else class="space-y-3 mt-2">
              <UInput
                v-model="avatarUrlInput"
                placeholder="https://..."
                icon="i-heroicons-link"
              />
              <UButton color="primary" @click="validateAndApplyAvatarUrl">
                Usar esta imagen
              </UButton>
            </div>

            <UProgress
              v-if="uploadingAvatar"
              animation="carousel"
              color="primary"
            />
          </div>
        </div>
      </UCard>

      <!-- Información Personal -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-3">
            <div class="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
              <UIcon name="i-heroicons-user-circle" class="text-xl text-primary" />
            </div>
            <div>
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Información Personal</h2>
              <p class="text-sm text-gray-500 dark:text-gray-400">Completa tus datos profesionales</p>
            </div>
          </div>
        </template>

        <div class="space-y-8 py-2">
          <!-- Nombre y Título -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UFormField
              label="Nombre completo"
              required
              :error="errors.fullName"
              description="Tu nombre será visible públicamente"
            >
              <UInput
                v-model="form.fullName"
                placeholder="Ej: Juan Pérez"
                class="w-full"
                icon="i-heroicons-user"
              />
            </UFormField>

            <UFormField
              label="Título profesional"
              description="Tu rol o expertise principal"
            >
              <UInput
                v-model="form.headline"
                placeholder="Ej: Desarrollador Full Stack"
                class="w-full"
                icon="i-heroicons-briefcase"
              />
            </UFormField>
          </div>

          <!-- Separador visual -->
           <USeparator />

          <!-- Ubicación y Email -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UFormField
              label="Ubicación"
              description="Ciudad o país donde trabajas"
            >
              <UInput
                v-model="form.location"
                placeholder="Ej: Madrid, España"
                class="w-full"
                icon="i-heroicons-map-pin"
              />
            </UFormField>

            <UFormField
              label="Email de contacto"
              :error="errors.emailPublic"
              description="Email público para contactarte"
            >
              <UInput
                v-model="form.emailPublic"
                placeholder="contacto@ejemplo.com"
                class="w-full"
                type="email"
                icon="i-heroicons-envelope"
              />
            </UFormField>
          </div>

          <!-- Separador visual -->
          <USeparator />

          <!-- Biografía - Ocupa todo el ancho -->
          <UFormField
            label="Biografía profesional"
            description="Describe tu trayectoria, habilidades y objetivos profesionales. Esta información ayudará a otros a conocer tu perfil."
          >
            <UTextarea
              v-model="form.bio"
              placeholder="Cuéntanos sobre tu experiencia, habilidades técnicas, logros destacados y qué te apasiona de tu profesión..."
              :rows="6"
              resize
              class="w-full"
            />
            <template #help>
              <div class="flex items-center gap-2 mt-2">
                <UIcon name="i-heroicons-light-bulb" class="text-gray-400" />
                <span class="text-xs text-muted">
                  Tip: Una buena biografía aumenta tu visibilidad y credibilidad profesional
                </span>
              </div>
            </template>
          </UFormField>
        </div>
      </UCard>

      <!-- Redes Sociales -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-3">
            <div class="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
              <UIcon name="i-heroicons-globe-alt" class="text-xl text-primary" />
            </div>
            <div>
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Redes Sociales</h2>
              <p class="text-sm text-gray-500 dark:text-gray-400">Conecta tus perfiles profesionales</p>
            </div>
          </div>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
          <UFormField 
            label="GitHub"
            description="Tu perfil de repositorios"
          >
            <UInput
              v-model="form.socials.github"
              placeholder="https://github.com/usuario"
              size="lg"
              icon="i-simple-icons-github"
            />
          </UFormField>

          <UFormField 
            label="LinkedIn"
            description="Tu red profesional"
          >
            <UInput
              v-model="form.socials.linkedin"
              placeholder="https://linkedin.com/in/usuario"
              size="lg"
              icon="i-simple-icons-linkedin"
            />
          </UFormField>

          <UFormField 
            label="Twitter / X"
            description="Tu cuenta de X"
          >
            <UInput
              v-model="form.socials.twitter"
              placeholder="https://twitter.com/usuario"
              size="lg"
              icon="i-simple-icons-x"
            />
          </UFormField>

          <UFormField 
            label="Sitio Web Personal"
            description="Tu portfolio o blog"
          >
            <UInput
              v-model="form.socials.website"
              placeholder="https://miweb.com"
              size="lg"
              icon="i-heroicons-link"
            />
          </UFormField>
        </div>
      </UCard>

      <!-- CV / Currículum -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-3">
            <div class="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
              <UIcon name="i-heroicons-document-text" class="text-xl text-primary" />
            </div>
            <div>
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Currículum Vitae</h2>
              <p class="text-sm text-gray-500 dark:text-gray-400">Comparte tu CV en formato PDF</p>
            </div>
          </div>
        </template>

        <div class="space-y-4 py-2">
          <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Sube tu CV actualizado en formato PDF. Este archivo estará disponible para que los visitantes de tu perfil puedan descargarlo.
          </p>

          <div class="flex flex-col sm:flex-row items-start gap-4">
            <label class="block">
              <UButton
                color="neutral"
                variant="solid"
                icon="i-heroicons-arrow-up-tray"
                :loading="uploadingCv"
                :disabled="uploadingCv"
                class="cursor-pointer"
                size="lg"
                @click="openCvPicker"
              >
                {{ uploadingCv ? 'Subiendo...' : (form.cvUrl ? 'Cambiar CV' : 'Subir CV') }}
              </UButton>
              
              <input
                ref="cvInput"
                type="file"
                accept="application/pdf"
                class="hidden"
                :disabled="uploadingCv"
                @change="e => e.target.files && onCvUpload(e.target.files[0])"
              />

              <p v-if="selectedCvFileName && !form.cvUrl" class="text-sm text-gray-500 mt-1 truncate">
                Archivo seleccionado: {{ selectedCvFileName }}
              </p>

            </label>

            <div v-if="form.cvUrl" class="flex-1 flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30">
                <UIcon name="i-heroicons-document-check" class="text-green-600 dark:text-green-400 text-xl" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 dark:text-white">CV subido correctamente</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{{ form.cvUrl }}</p>
              </div>
              <UButton
                color="neutral"
                variant="ghost"
                icon="i-heroicons-arrow-top-right-on-square"
                size="sm"
                :to="form.cvUrl"
                target="_blank"
                square
              />
            </div>
          </div>

          <UProgress
            v-if="uploadingCv"
            animation="carousel"
            color="primary"
          />
        </div>
      </UCard>

      <!-- Acciones -->
      <div class="sticky bottom-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-lg p-4">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-2 text-sm">
            <div v-if="hasChanges" class="flex items-center gap-2 px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 rounded-md">
              <UIcon name="i-heroicons-exclamation-triangle" class="text-amber-600 dark:text-amber-400" />
              <span class="text-amber-900 dark:text-amber-200 font-medium">
                Tienes cambios sin guardar 
              </span>
            </div>
            <div v-else class="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 rounded-md">
              <UIcon name="i-heroicons-check-circle" class="text-green-600 dark:text-green-400" />
              <span class="text-green-900 dark:text-green-200 font-medium">
                Todo guardado
              </span>
            </div>
          </div>

          <div class="flex gap-3">
            <UButton
              v-if="hasChanges"
              color="neutral"
              variant="outline"
              icon="i-heroicons-arrow-path"
              @onclick="() => form && originalForm && Object.assign(form, cloneForm(originalForm))"
            >
              Descartar
            </UButton>

            <UButton
              color="primary"
              size="lg"
              icon="i-heroicons-check"
              :loading="saving"
              :disabled="!hasChanges || !isValid || saving"
              @click="onSave"
            >
              {{ saving ? 'Guardando...' : 'Guardar cambios' }}
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>





