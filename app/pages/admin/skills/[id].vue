<!-- //app/pages/admin/skills/[id].vue -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSupabaseClient } from '#imports'

import SkillForm from '~/components/admin/skills/SkillForm.vue'
import type { SkillFormModel } from '~/composables/admin/skills/models/SkillFormModel'
import { skillToFormMapper } from '~/composables/admin/skills/mappers/skillToFormMapper'
import { useSaveSkillUseCase } from '~/composables/admin/skills/usecases/useSaveSkillUseCase'
import SkillStatusPanel from '~/components/admin/skills/SkillStatusPanel.vue'

definePageMeta({
    layout: false,
    middleware: 'admin-auth',
})

const route = useRoute()
const router = useRouter()
const supabase = useSupabaseClient()

const isNew = computed(() => route.params.id === 'new')

const pageTitle = computed(() =>
  isNew.value ? 'Create Skill' : 'Edit Skill'
)

const pageDescription = computed(() =>
  isNew.value
    ? 'Add a new skill'
    : 'Update skill details'
)

const form = ref<SkillFormModel>({
  name: '',
  description: null,
  category: null,
  level: 'basic',
  displayOrder: 0,
  status: 'draft',
})
const isLoadingSkill = ref(false)
const { save, loading, error, success } = useSaveSkillUseCase()

const fetchSkill = async () => {
  if (isNew.value) return

  isLoadingSkill.value = true
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .eq('id', route.params.id)
    .single()

    isLoadingSkill.value = false

  if (error) {
    console.error(error)
    return
  }

  form.value = skillToFormMapper(data)
}

await fetchSkill()

const onSubmit = async (payload: SkillFormModel) => {
  await save(payload)

  if (!success.value) return

    setTimeout(() => {
    router.push('/admin/skills')
  }, 1500)
}

const goBack = () => {
  router.push('/admin/skills/')
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
        <div v-if="isLoadingSkill" class="py-12 text-center">
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


        <UContainer class="space-y-4">
          <!-- class="bg-elevated border border-accented rounded-lg p-6" -->
               <UAlert
            color="neutral"
            variant="soft"
            icon="i-lucide-lightbulb"
            title="Ejemplo de Skill"
            description="Arquitectura Frontend, Clean Code, Testing, Diseño de APIs"
          />
          
          <SkillForm
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

          <SkillStatusPanel
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
