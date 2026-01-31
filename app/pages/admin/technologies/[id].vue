<!-- //app/pages/admin/technologies/[id].vue -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSupabaseClient } from '#imports'

import type { TechnologyFormModel } from '~/composables/admin/technologies/models/TechnologyFormModel'
import { useSaveTechnologyUseCase } from '~/composables/admin/technologies/usecases/useSaveTechnologyUseCase'
import { technologyToFormMapper } from '~/composables/admin/technologies/mappers/technologyToFormMapper'
import TechnologyForm from '~/components/admin/technologies/TechnologyForm.vue'
import TechnologyStatusPanel from '~/components/admin/technologies/TechnologyStatusPanel.vue'


definePageMeta({
    layout: false,
    // middleware: 'admin-auth',
    
})

const route = useRoute()
const router = useRouter()
const supabase = useSupabaseClient()

const isNew = computed(() => route.params.id === 'new')

const pageTitle = computed(() =>
  isNew.value ? 'Create Technology' : 'Edit Technology'

)

const pageDescription = computed(() =>
  isNew.value
  ? 'Añadir tech, No olvides que el estatus por default es (draft)' 
  : 'Editar Tech , aqui pudes cambair los valores predeterminados.'
)

const { save, loading, error, success } = useSaveTechnologyUseCase()

const isLoadingTech = ref(false) 
const form = ref<TechnologyFormModel>({
  name: '',
  description: null,
  icon: null,
  color: null,
  websiteUrl: null,
  status: 'draft',
})

/**
 * Load technology (edit mode)
 */
const fetchTechnology = async () => {
  if (isNew.value) return

  isLoadingTech.value = true
  const { data, error } = await supabase
    .from('technologies')
    .select('*')
    .eq('id', route.params.id)
    .single()

    isLoadingTech.value = false

  if (error) {
    console.error(error)
    return
  }

  form.value = technologyToFormMapper(data)
}

await fetchTechnology()

/**
 * Submit
 */
const onSubmit = async (payload: TechnologyFormModel) => {
  await save(payload)

  if (!success.value) return

  setTimeout(() => {
    goBack()
  }, 1500)

}
const goBack = () => {
  router.push('/admin/technologies/')
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
        <div v-if="isLoadingTech" class="py-12 text-center">
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
          title="Tech saved"
          description="Redirecting…"
          class="mb-6"
        />


        <UContainer > 
          <!-- class="bg-elevated border border-accented rounded-lg p-6" -->
           <UAlert
            color="neutral"
            variant="soft"
            icon="i-lucide-lightbulb"
            title="Ejemplo de Tecnología"
            description="Vue, Angular, Nuxt, Tailwind, Supabase"
          />

          <TechnologyForm
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

          <TechnologyStatusPanel
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
