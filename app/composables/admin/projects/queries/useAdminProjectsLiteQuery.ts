//app/composables/admin/projects/queries/useAdminProjectsLiteQuery.ts
import { ref, onMounted } from 'vue'
import { useSupabaseClient } from '#imports'
import type { Tables } from '~/types/database.types'

type ProjectLite = Pick<
  Tables<'projects'>,
  'id' | 'title' | 'thumbnail_url' | 'status' | 'created_at' | 'updated_at'
>

export const useAdminProjectsLiteQuery = () => {
  const supabase = useSupabaseClient()

  const projects = ref<ProjectLite[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)

  const fetchProjects = async () => {
    loading.value = true
    error.value = null

    const { data, error: dbError } = await supabase
      .from('projects')
      .select('id, title, thumbnail_url, status, created_at, updated_at')
      .neq('status', 'trashed')
      .order('created_at', { ascending: false })

    if (dbError) {
      error.value = dbError.message
      loading.value = false
      return
    }

    projects.value = data ?? []
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
