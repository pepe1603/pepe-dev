<script setup lang="ts" name="ExperienceForm">
import { ref, watch, computed } from 'vue'
import { z } from 'zod'
import type { ExperienceFormModel } from '~/composables/admin/experiences/models/ExperienceFormModel'
import ProjectAvatarSelect from '../projects/ProjectAvatarSelect.vue'

/* =====================
   Props & emits
===================== */

const props = defineProps<{
  modelValue: ExperienceFormModel
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', value: ExperienceFormModel): void
  (e: 'cancel'): void
}>()

/* =====================
   Type options
===================== */

const experienceTypeOptions = [
  { label: 'Work', value: 'work' },
  { label: 'Education', value: 'education' },
  { label: 'Certification', value: 'certification' },
  { label: 'Volunteer', value: 'volunteer' },
  { label: 'Talk', value: 'talk' },
  { label: 'Publication', value: 'publication' }
] satisfies { label: string; value: ExperienceFormModel['type'] }[]

/* =====================
   Local reactive form
===================== */

const form = ref<ExperienceFormModel>({ ...props.modelValue })

watch(
  () => props.modelValue,
  (val) => {
    form.value = { ...val }
  },
  { deep: true }
)

const isEditing = computed(() => !!form.value.id)

/* =====================
   Business rules
===================== */

const typesWithoutEndDate: ExperienceFormModel['type'][] = [
  'talk',
  'publication',
  'certification'
]

const typesWithRequiredEndDate: ExperienceFormModel['type'][] = [
  'work',
  'education',
  'volunteer'
]

const hasEndDate = computed(() =>
  !typesWithoutEndDate.includes(form.value.type)
)

const isEndDateRequired = computed(() =>
  typesWithRequiredEndDate.includes(form.value.type)
)

watch(
  () => form.value.type,
  () => {
    if (!hasEndDate.value) {
      form.value.endDate = null
    }
  }
)

/* =====================
   Zod schema
===================== */

const experienceSchema = z
  .object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    type: z.string(),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().nullable(),
  })
  .superRefine((data, ctx) => {
    if (
      typesWithRequiredEndDate.includes(
        data.type as ExperienceFormModel['type']
      ) &&
      !data.endDate
    ) {
      ctx.addIssue({
        path: ['endDate'],
        message: 'End date is required for this type of experience',
        code: z.ZodIssueCode.custom,
      })
    }
  })

/* =====================
   Form errors (Zod → UI)
===================== */

type FormErrors = Partial<Record<keyof ExperienceFormModel, string>>

const errors = ref<FormErrors>({})

const clearErrors = () => {
  errors.value = {}
}

const mapZodErrors = (zodError: z.ZodError) => {
  clearErrors()

  for (const issue of zodError.issues) {
    const field = issue.path[0] as keyof ExperienceFormModel
    errors.value[field] = issue.message
  }
}

/* =====================
   Handlers
===================== */

const submit = () => {
  const result = experienceSchema.safeParse(form.value)

  if (!result.success) {
    mapZodErrors(result.error)
    return
  }

  clearErrors()
  emit('submit', form.value)
}

const cancel = () => emit('cancel')
</script>

<template>
  <UForm
    class="space-y-6 border border-accented p-4 rounded-lg"
    @submit.prevent="submit"
  >
    <!-- CORE -->
    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold">
          Experience Information
        </h2>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <UFormField label="Title" required :error="errors.title" class="w-full">
          <UInput v-model="form.title" size="lg" class="w-full" />
        </UFormField>

        <UFormField label="Subtitle" class="w-full">
          <UInput v-model="form.subtitle" size="lg" class="w-full" />
        </UFormField>

        <UFormField
          label="Description"
          required
          class="w-full md:col-span-2"
          :error="errors.description"
        >
          <UTextarea v-model="form.description" autoresize size="lg" class="w-full" />
        </UFormField>
      </div>
    </UCard>

    <!-- META -->
    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold">
          Additional Information
        </h2>
      </template>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <UFormField label="Type" required class="w-full">
          <USelect
            v-model="form.type"
            :items="experienceTypeOptions"
            size="lg"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Start date" required :error="errors.startDate" class="w-full">
          <UInput v-model="form.startDate" type="date" size="lg" class="w-full" />
        </UFormField>

        <UFormField
          v-if="hasEndDate"
          label="End date"
          :required="isEndDateRequired"
          :error="errors.endDate"
          class="w-full"
        >
          <UInput v-model="form.endDate" type="date" size="lg" class="w-full" />
        </UFormField>
      </div>

      <UAlert
        v-if="!hasEndDate"
        class="mt-4"
        color="neutral"
        variant="soft"
        icon="i-lucide-info"
        title="Business rule"
        description="This type of experience does not require an end date."
      />
    </UCard>

    <!-- RELATED PROJECT -->
     <UAccordion 
     :items="[ { label: 'Vincular Proyecto (optional)', icon: 'i-lucide-box', slot: 'project' } ]"
     variant="soft"
      class="mt-6" 
      >
        <template #project>
            <ProjectAvatarSelect v-model="form.relatedProjectId" />
        </template> 
      </UAccordion>

    <!-- ACTIONS -->
    <div class="flex justify-end gap-3 pt-4 border-t border-accented">
      <UButton
        type="submit"
        color="primary"
        size="lg"
        icon="i-lucide-save"
        :loading="props.loading"
      >
        {{ isEditing ? 'Update Experience' : 'Create Experience' }}
      </UButton>

      <UButton
        variant="outline"
        color="neutral"
        size="lg"
        @click="cancel"
      >
        Cancel
      </UButton>
    </div>
  </UForm>
</template>
