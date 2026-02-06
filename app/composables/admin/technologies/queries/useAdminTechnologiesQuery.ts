//app/composables/admin/technologies/queries/useAdminTechnologiesQuery.ts
import { ref, onMounted } from 'vue'
import { useSupabaseClient } from '#imports'
import type { Tables } from '~/types/database.types'

type TechnologyRow = Tables<'technologies'>

export const useAdminTechnologiesQuery = () => {
  const supabase = useSupabaseClient()

  const technologies = ref<TechnologyRow[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)

  const fetchTechnologies = async () => {
    loading.value = true
    error.value = null

    const { data, error: dbError } = await supabase
      .from('technologies')
      .select('*')
      .order('created_at', { ascending: false })

    if (dbError) {
      error.value = dbError.message
      loading.value = false
      return
    }

    technologies.value = data ?? []
    loading.value = false
  }

  onMounted(fetchTechnologies)

  return {
    technologies,
    loading,
    error,
    refetch: fetchTechnologies,
  }
}
