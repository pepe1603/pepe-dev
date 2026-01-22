// app/composables/admin/projects/queries/useAdminProjectsQuery.ts
import { ref, onMounted } from 'vue'
import { useSupabaseClient } from '#imports'
import type { Tables } from '~/types/database.types'

type ProjectRow = Tables<'projects'>

export const useAdminProjectsQuery = () => {
  const supabase = useSupabaseClient()

  const projects = ref<ProjectRow[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)

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
