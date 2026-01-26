<script setup lang="ts" name="SkillForm">
import { reactive, watch } from 'vue'
import type { SkillFormModel } from '~/composables/admin/skills/models/SkillFormModel'
import SkillCategoryTagsInput from './SkillCategoryInput.vue';
import { SKILL_CATEGORY_SUGGESTIONS } from '~/constants/skillCategories';

const props = defineProps<{
  modelValue: SkillFormModel
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', value: SkillFormModel): void
  (e: 'cancel'): void
}>()

const localForm = reactive<SkillFormModel>({
  id: undefined,
  name: '',
  description: null,
  category: null,
  level: 'basic',
  status: 'draft',
})

const isEditMode = computed(() => !!localForm.id)



watch(
  () => props.modelValue,
  (value) => {
    Object.assign(localForm, value)
  },
  { immediate: true, deep: true }
)

const levelOptions = [
  { label: 'Basic', value: 'basic' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
  { label: 'Expert', value: 'expert' },
]

const statusOptions = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
  { label: 'Archived', value: 'archived' },
]

const onSubmit = () => {
  emit('submit', { ...localForm })
}
</script>

<template>
  <UForm
    :state="localForm"
    class="space-y-6 border border-accented p-4 rounded-lg"
    @submit="onSubmit"
  >
    <!-- Basic Information -->
    <UCard >
      <template #header>
        <h2 class="text-lg font-semibold">
          Skill Information
        </h2>
      </template>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        <UFormField label="Name" name="name" required class="w-full">
          <UInput
            v-model="localForm.name"
            size="lg"
            placeholder="Vue.js, Docker, PostgreSQL..."
            class="w-full"
          />
        </UFormField>

      <UFormField
        label="Category"
        name="category"
        help="Use categories to group skills. You can add custom ones."
      >
        <SkillCategoryTagsInput
          v-model="localForm.category"
          :suggestions="[...SKILL_CATEGORY_SUGGESTIONS]"
        />
      </UFormField>



        <UFormField label="Description" name="description" class="w-full sm:col-span-2 md:col-span-3">
          <UTextarea
            v-model="localForm.description"
            size="lg"
            :rows="3"
            placeholder="Optional description"
            class="w-full"
          />
        </UFormField>
      </div>
    </UCard>

    <!-- Level & Order -->
    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold">
          Skill Settings
        </h2>
      </template>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <UFormField label="Level" name="level" required>
          <USelect
            v-model="localForm.level"
            :items="levelOptions"
            option-label="label"
            option-value="value"
            size="lg"
            class="w-full"
          />
        </UFormField>
      </div>
    </UCard>

    <!-- Actions -->
    <div class="flex justify-end gap-3 pt-6 border-t border-accented">
      
      <UButton
        type="submit"
        color="primary"
        size="lg"
        :loading="loading"
        icon="i-lucide-save"
      >
        Save Skill
      </UButton>

      <UButton
        type="button"
        color="neutral"
        variant="outline"
        size="lg"
        @click="emit('cancel')"
      >
        Cancel
      </UButton>
    </div>
  </UForm>
</template>
