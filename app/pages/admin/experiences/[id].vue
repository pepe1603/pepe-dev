<!-- //app/pages/admin/experiences/[id].vue -->
<script setup lang="ts" >
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSupabaseClient } from '#imports'

import ExperienceForm from '~/components/admin/experiences/ExperienceForm.vue'
import type { ExperienceFormModel } from '~/composables/admin/experiences/models/ExperienceFormModel'
import { useSaveExperienceUseCase } from '~/composables/admin/experiences/usecases/useSaveExperienceUseCase'
import { experienceToFormMapper } from '~/composables/admin/experiences/mappers/experienceToFormMapper'
import ExperienceStatusPanel from '~/components/admin/experiences/ExperienceStatusPanel.vue'

definePageMeta({
  layout: false,
  middleware: 'admin-auth',
})

const route = useRoute()
const router = useRouter()
const supabase = useSupabaseClient()

const isNew = computed(() => route.params.id === 'new')

const pageTitle = computed(() =>
  isNew.value ? 'Create Experience' : 'Edit Experience'
)

const pageDescription = computed(() =>
  isNew.value
    ? 'Add a new professional experience'
    : 'Update experience details'
)

const { save, loading, error, success } = useSaveExperienceUseCase()

const form = ref<ExperienceFormModel>({
  title: '',
  subtitle: null,
  description: '',
  type: 'work',
  startDate: '',
  endDate: null,
  location: null,
  url: null,
  relatedProjectId: null,
  status: 'draft',
})

const isLoadingExperience = ref(false)

/**
 * Fetch experience (edit)
 */
const fetchExperience = async () => {
  if (isNew.value) return

  isLoadingExperience.value = true

  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .eq('id', route.params.id)
    .single()

  isLoadingExperience.value = false

  if (error) {
    console.error(error)
    return
  }

  form.value = experienceToFormMapper(data)
}

await fetchExperience()

/**
 * Submit
 */
const onSubmit = async (payload: ExperienceFormModel) => {
  await save(payload)

  if (!success.value) return

  setTimeout(() => {
    goBack()
  }, 1500)
}

const goBack = () => {
  router.push('/admin/experiences')
}
</script>

<template>
<div>
    <NuxtLayout
    name="admin"
    :title="pageTitle"
    :description="pageDescription"
  >
    <div class="max-w-5xl space-y-4">
      <!-- Loading -->
      <div v-if="isLoadingExperience" class="py-12 text-center">
        <UIcon
          name="i-lucide-loader-circle"
          class="size-8 animate-spin text-primary mx-auto"
        />
      </div>

      <!-- Alerts -->
      <UAlert
        v-if="error"
        color="error"
        variant="soft"
        icon="i-lucide-alert-triangle"
        :title="error"
        class="mb-6"
      />

      <UAlert
        v-if="success"
        color="success"
        variant="soft"
        icon="i-lucide-check-circle"
        title="Experience saved"
        description="Redirecting…"
        class="mb-6"
      />

      <!-- Form -->
      <UContainer>
        <ExperienceForm
          :model-value="form"
          :loading="loading"
          @submit="onSubmit"
          @cancel="goBack"
        />

        <!-- Aviso sobre el estado -->
      <UAlert
        color="info"
        variant="soft"
        icon="i-lucide-info"
        title="Estado de la skill"
        description="No es necesario guardar el formulario para cambiar el estado. El cambio se aplicará inmediatamente."
      />

      <ExperienceStatusPanel
        v-if="!isNew"
        :id="form.id!"
        :status="form.status"
        class="my-6"
        @updated="status => (form.status = status)"
      />
      </UContainer>
    </div>
  </NuxtLayout>
</div>
</template>
