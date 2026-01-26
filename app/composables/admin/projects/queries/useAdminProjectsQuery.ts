// app/composables/admin/projects/queries/useAdminProjectsQuery.ts
import { ref, onMounted } from 'vue'
import { useSupabaseClient } from '#imports'
import type { ProjectFormModel } from '../models/ProjectFormModel'

export const useAdminProjectsQuery = () => {
  const supabase = useSupabaseClient()

  // ✅ Tipamos explícitamente como ProjectFormModel[]
  const projects = ref<ProjectFormModel[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)

  const normalizeProject = (p: any): ProjectFormModel => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    shortDescription: p.short_description,
    description: p.description,
    subtitle: p.subtitle ?? null,
    repositoryUrl: p.repo_url ?? null,
    demoUrl: p.demo_url ?? null,
    thumbnailUrl: p.thumbnail_url ?? null,
    status: p.status,
    isFeatured: p.is_featured ?? false,
    tags: p.tags ?? [],
    technologyIds: p.technology_ids ?? [],
    relatedExperienceId: p.related_experience_id ?? null,
    createdAt: p.created_at,
    updatedAt: p.updated_at,
  })

  const fetchProjects = async () => {
    loading.value = true
    error.value = null

    const { data, error: dbError } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (dbError) {
      error.value = dbError.message
      loading.value = false
      return
    }

    // ✅ Normalizamos al tipo plano ProjectFormModel
    projects.value = (data ?? []).map(normalizeProject)
    loading.value = false
  }

  onMounted(fetchProjects)

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
  }
}
