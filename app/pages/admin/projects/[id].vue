<!-- app/pages/admin/projects/[id].vue -->
<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSupabaseClient, useHead } from '#imports'

import type { ProjectFormModel } from '~/composables/admin/projects/models/ProjectFormModel'
import { useSaveProjectUseCase } from '~/composables/admin/projects/usecases/useSaveProjectUseCase'
import { projectToFormMapper } from '~/composables/admin/projects/mappers/projectToFormMapper'
import { useProjectThumbnailSync } from '~/composables/admin/projects/useProjectThumbnailSync'

import ProjectForm from '~/components/admin/projects/ProjectForm.vue'
import ProjectStatusPanel from '~/components/admin/projects/ProjectStatusPanel.vue'
import ProjectMediaPanel from '~/components/admin/projects/media_project/ProjectMediaPanel.vue'
import type { ProjectCreateModel } from '~/composables/admin/projects/models/ProjectCreateModel'


definePageMeta({
  layout: false,
  middleware: 'admin-auth',
})

const route = useRoute()
const router = useRouter()
const supabase = useSupabaseClient()

const { save, loading, error, success } = useSaveProjectUseCase()
/**
 * Mode
 */
const isNew = computed(() => route.params.id === 'new')

// Computed page title & description
const pageTitle = computed(() => isNew.value ? 'Create New Project' : 'Edit Project')
const pageDescription = computed(() => 
  isNew.value 
    ? 'Fill in the details below to create a new project' 
    : 'Update the project information as needed'
)


// Update the page meta dynamically
watchEffect(() => {
  useHead({
    title: pageTitle.value,
    meta: [
      {
        name: 'description',
        content: pageDescription.value
      }
    ]
  })
})

/**
 * Form state
 */

const form = ref<ProjectCreateModel | ProjectFormModel>(
  isNew.value
    ? {
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
      }
    : {} as ProjectFormModel // luego se llenará con fetchProject
)


/**
 * Loading state
 */
const isLoadingProject = ref(false)


/**
 * Load project (edit mode)
 */
const fetchProject = async () => {
  if (isNew.value) return

  isLoadingProject.value = true

  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_technologies (
        technology_id
      )
    `)
    .eq('id', route.params.id)
    .single()

  isLoadingProject.value = false

  if (error) {
    console.error(error)
    return
  }
  form.value = {
    ...projectToFormMapper(data),
    technologyIds: data.project_technologies.map(
      pt => pt.technology_id
    ),
  } as ProjectFormModel

}

await fetchProject()

/**
 * Submit
 */
const { sync: syncThumbnail } = useProjectThumbnailSync()
const renameError = ref<string | null>(null)

const onSubmit = async (payload: ProjectFormModel) => {
  // Guardamos el slug original para detectar cambios
  const originalSlug = form.value.slug

  // 1️⃣ Guardar project en DB
  await save(payload)

  if (!success.value) return

  try {
    // 2️⃣ Sync thumbnail si slug cambió
    const newThumbnailUrl = await syncThumbnail({
      originalSlug,
      newSlug: payload.slug,
      thumbnailUrl: payload.thumbnailUrl
    })

    // 3️⃣ Actualizar thumbnailUrl si cambió
    if (newThumbnailUrl && newThumbnailUrl !== payload.thumbnailUrl) {
      await save({
        ...payload,
        thumbnailUrl: newThumbnailUrl
      })
    }
    renameError.value = null
  } catch (e: any) {
    console.error('Thumbnail rename failed:', e.message)
    renameError.value = 'Failed to rename thumbnail. The project was saved, but the thumbnail could not be updated.'

  }

  // 4️⃣ Redirigir al listado
  setTimeout(()=>{
    router.push('/admin/projects')
  }, 3000);
}


/**
 * Go back
 */
const goBack = () => {
  router.push('/admin/projects')
}

const editForm = computed<ProjectFormModel | null>(() => 
  !isNew.value ? (form.value as ProjectFormModel) : null
)



</script>

<template>
<div>
    <NuxtLayout 
    name="admin"
    :title="pageTitle"
    :description="pageDescription"
  >
    <template #page-actions>
            <!-- Status Badge (only in edit mode) -->
            <UBadge
              v-if="!isNew"
              :label="form.status"
              :color="form.status === 'published' ? 'success' : 'warning'"
              variant="soft"
              size="lg"
            />
          
    </template>

    <div >
      <div class="max-w-5xl  mx-auto ">
        <!-- Loading State -->
        <div 
          v-if="isLoadingProject" 
          class="flex items-center justify-center py-12"
        >
          <div class="text-center space-y-3">
            <UIcon 
              name="i-lucide-loader-circle" 
              class="size-8 animate-spin text-primary mx-auto"
            />
            <p class="text-sm text-muted">
              Loading project...
            </p>
          </div>
        </div>

        <!-- Content -->
        <template v-else>
          <!-- Error Alert -->
          <UAlert
            v-if="error"
            color="error"
            variant="soft"
            icon="i-lucide-alert-triangle"
            :title="isNew ? 'Failed to create project' : 'Failed to update project'"
            :description="error"
            class="mb-6"
            :close-button="{ 
              icon: 'i-lucide-x',
              color: 'error',
              variant: 'link'
            }"
          />

          <!-- Success Alert (optional, if you want to show before redirect) -->
          <UAlert
            v-if="success"
            color="success"
            variant="soft"
            icon="i-lucide-check-circle"
            :title="isNew ? 'Project created successfully!' : 'Project updated successfully!'"
            description="Redirecting to projects list..."
            class="mb-6"
          />

          <!-- Form Card -->
          <div class="bg-elevated rounded-lg border border-accented shadow-sm p-6 sm:p-8">

            <UAlert
            v-if="renameError"
            color="warning"
            variant="soft"
            icon="i-lucide-alert-triangle"
            :title="renameError"
            class="mb-4"
          />

          <UAlert
            v-if="isNew"
            color="info"
            variant="soft"
            icon="i-lucide-info"
            title="Project creation"
            description="New projects are created as draft by default. You can publish it later from the edit screen."
            class="mb-4"
          />

          <UAlert
            color="info"
            variant="soft"
            icon="i-lucide-link"
            title="Link with experiences"
            description="Once created, you can link this project to an experience from the Experiences section."
            class="mb-6"
          />

                    <!-- Help Text -->
          <div class="my-6 flex items-start gap-2 text-sm text-muted">
            <UIcon name="i-lucide-info" class="size-4 mt-0.5 shrink-0" />
            <p>
              After {{ isNew ? 'creating' : 'updating' }} the project, you'll be automatically redirected to the projects list.
            </p>
          </div>


            <UContainer>              
              <ProjectForm
                :model-value="form"
                :loading="loading"
                :is-create="isNew"
                @submit="onSubmit"
                @cancel="goBack"
              />

                  <!-- Aviso sobre el estado -->
            <UAlert
              v-if="!isNew"
              color="info"
              variant="soft"
              icon="i-lucide-info"
              title="Estado de la skill"
              description="No es necesario guardar el formulario para cambiar el estado. El cambio se aplicará inmediatamente."
              class="my-4"
            />            
              <ProjectStatusPanel
                 v-if="editForm"
                :id="editForm.id as string"
                :status="form.status"
                class="my-6"
                @updated="status => (form.status = status)"
              />
              
              <!-- Project Media -->
              <ProjectMediaPanel
                v-if="!isNew"
                :project-id="editForm?.id as string"
                :project-slug="form.slug"
                class="my-8"
              />



            </UContainer>
          </div>


        </template>
      </div>
    </div>
  </NuxtLayout>
</div>
</template>
