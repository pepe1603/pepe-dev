<!-- app/components/admin/projects/ProjectForm.vue -->
<script setup lang="ts" name="ProjectForm">
import { reactive, watch } from 'vue'
import type { ProjectFormModel } from '~/composables/admin/projects/models/ProjectFormModel'
import { projectFormSchema } from '~/composables/admin/projects/useProjectFormSchema'
import { slugify } from '~/utils/slugify'
import UploadField from '../../upload/UploadField.vue';
import { useAdminTechnologiesOptions } from '~/composables/admin/technologies/queries/useAdminTechnologiesOptions';
import ProjectTagsInput from './ProjectTagsInput.vue';
import { PROJECT_TAG_SUGGESTIONS } from '~/constants/projectTags';


const props = defineProps<{
  modelValue: ProjectFormModel
  loading?: boolean
  isCreate: boolean
}>()


const { technologies } = useAdminTechnologiesOptions()

const emit = defineEmits<{
  (e: 'submit', value: ProjectFormModel): void
  (e: 'cancel'): void
}>()

/**
 * Local copy for editing
 */
const localForm = reactive<ProjectFormModel>({
  id: undefined,
  title: '',
  slug: '',
  shortDescription: '',
  description: '',
  subtitle: null,
  repositoryUrl: null,
  demoUrl: null,
  thumbnailUrl: null,
  isFeatured: false,
  tags: [],
  status: 'draft',
  technologyIds: [],
})

const statusOptions = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
  { label: 'Archived', value: 'archived' },
]

const statusColor = (status: string) => {
  switch (status) {
    case 'published':
      return 'success'
    case 'archived':
      return 'error'
    default:
      return 'warning'
  }
}

const isEditMode = computed(() => !!localForm.id)

/**
 * Sync when modelValue changes (edit mode)
 */
watch(
  () => props.modelValue,
  (value) => {
    Object.assign(localForm, value)
  },
  { immediate: true, deep: true }
)

watch(
  () => localForm.title,
  (title) => {
    if (!props.isCreate) return

    localForm.slug = slugify(title)
  }
)


const onSubmit = () => {
  emit('submit', { ...localForm })
}
</script>

<template>
  <UForm
    :state="localForm"
    :schema="projectFormSchema"
    class="space-y-6 w-full max-w-3xl mx-auto"
    @submit="onSubmit"
  >

    <!-- Basic Information Section -->
    <div class="space-y-4">
      <div class="text-lg font-semibold text-default">
        Basic Information
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Title -->
        <UFormField 
          label="Title" 
          name="title" 
          required
          class="md:col-span-2"
        >
          <UInput 
            v-model="localForm.title" 
            placeholder="Enter project title"
            size="lg"
            class="w-full"
          />
        </UFormField>

        <!-- Slug -->
        <UFormField
          name="slug"
          class="md:col-span-2"
        >
          <template #label>
            <div class="flex items-center gap-2">
              <span>Slug</span>

              <UBadge
                v-if="isCreate && localForm.slug"
                size="xs"
                color="info"
                variant="soft"
              >
                Auto-generated
              </UBadge>
            </div>
          </template>

  <UInput
    v-model="localForm.slug"
    :readonly="isCreate"
    size="lg"
    class="w-full"
  />

  <template v-if="isCreate" #help>
    Generated automatically from the title
  </template>
</UFormField>


        <!-- Subtitle -->
        <UFormField 
          label="Subtitle" 
          name="subtitle"
          class="md:col-span-2"
        >
          <UInput 
            v-model="localForm.subtitle"
            placeholder="Optional subtitle"
            size="lg"
            class="w-full"
          />
        </UFormField>
      </div>
    </div>

    <!-- Description Section -->
    <div class="space-y-4">
      <div class="text-lg font-semibold text-default">
        Description
      </div>

      <!-- Short description -->
      <UFormField 
        label="Short Description" 
        name="shortDescription" 
        required
        help="A brief summary of your project"
      >
        <UTextarea
          v-model="localForm.shortDescription"
          :rows="3"
          placeholder="Enter a short description..."
          size="lg"
          class="w-full"
        />
      </UFormField>

      <!-- Full Description -->
      <UFormField 
        label="Full Description" 
        name="description" 
        required
      >
        <UTextarea
          v-model="localForm.description"
          :rows="6"
          placeholder="Enter full project description..."
          size="lg"
          class="w-full"
        />
      </UFormField>
    </div>

    <!-- Media Section -->
    <div class="space-y-4">
      <div class="text-lg font-semibold text-default">
        Media & Links
      </div>

      <!-- Thumbnail Section -->
      <div class="space-y-4">
        <div class="text-lg font-semibold text-default">
          Project Thumbnail
        </div>

        <UTabs
          :items="[
            { label: 'Upload image', slot: 'upload' },
            { label: 'Image URL', slot: 'url' }
          ]"
        >
          <!-- Upload tab -->
          <template #upload>
            <UploadField
              label="Upload thumbnail"
              help="Recommended size: 1200×630px"
              target="project-thumbnails"
              :project-slug="localForm.slug"
              v-model="localForm.thumbnailUrl"
            />
          </template>

          <!-- URL tab -->
          <template #url>
            <UFormField
              label="Thumbnail URL"
              name="thumbnailUrl"
              help="Paste an external image URL"
            >
              <UInput
                v-model="localForm.thumbnailUrl"
                type="url"
                placeholder="https://images.example.com/thumbnail.jpg"
                icon="i-lucide-link"
                size="lg"
                class="w-full"
              />
            </UFormField>
          </template>
        </UTabs>
      </div>


      <!-- URLs Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UFormField 
          label="Repository URL" 
          name="repositoryUrl"
        >
          <UInput
            v-model="localForm.repositoryUrl"
            type="url"
            placeholder="https://github.com/..."
            icon="i-lucide-github"
            size="lg"
            class="w-full"
          />
        </UFormField>

        <UFormField 
          label="Demo URL" 
          name="demoUrl"
        >
          <UInput
            v-model="localForm.demoUrl"
            type="url"
            placeholder="https://demo.example.com"
            icon="i-lucide-external-link"
            size="lg"
            class="w-full"
          />
        </UFormField>
      </div>
    </div>

    <!-- Settings Section -->
    <div class="space-y-4">
      <div class="text-lg font-semibold text-default">
        Settings
      </div>

      <div class="space-y-3">
        <!-- Featured Toggle -->
        <UFormField>
          <UCheckbox
            v-model="localForm.isFeatured"
            label="Featured project"
            help="Mark this project as featured to highlight it"
            description="Los proyectos destacados se muestran en secciones principales del sitio (home, destacados). Úsalo solo para trabajos clave."
          />
        </UFormField>

        <!-- Tags -->
        <UFormField
          label="Tags"
          name="tags"
          help="Use tags to describe the type, domain or context of the project."
        >
          <ProjectTagsInput
            v-model="localForm.tags"
            :suggested-tags="PROJECT_TAG_SUGGESTIONS"
          />
        </UFormField>

        <!-- Status -->
        <UFormField
        v-if="isEditMode"
          label="Status"
          name="status"
          required
        >
          <USelect
          v-model="localForm.status"
          :items="statusOptions"
          option-label="label"
          option-value="value"
          size="lg"
          class="w-full"
        />



          <!-- Visual indicators -->
          <div class="flex gap-2 mt-2">
            <UBadge
              v-for="option in statusOptions"
              :key="option.value"
              :color="option.value === localForm.status
                ? statusColor(option.value)
                : 'neutral'"
              variant="subtle"
            >
              {{ option.label }}
            </UBadge>
          </div>
        </UFormField>

      </div>
    </div>

    <!-- Technologies Section -->
    <div class="space-y-4">
      <div class="text-lg font-semibold text-default">
        Technologies
      </div>

      <UFormField
        label="Technologies used"
        help="Select the technologies used in this project"
      >
        <USelectMenu
          v-model="localForm.technologyIds"
          :items="technologies"
          value-key="id"
          label-key="name"
          multiple
          searchable
          size="lg"
          class="w-full"
          placeholder="Select technologies..."
        />
      </UFormField>
    </div>


    <!-- Actions -->
    <div class="flex items-center justify-end gap-3 pt-6 border-t border-accented">
      <UButton
        type="submit"
        color="primary"
        size="lg"
        :loading="loading"
        icon="i-lucide-save"
      >
        Save Project
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
