//app/composables/admin/experiences/queries/useAdminExperiencesQuery.ts
import { ref, onMounted } from 'vue'
import { useSupabaseClient } from '#imports'
import type { Tables } from '~/types/database.types'

type ExperienceRow = Tables<'experiences'>

export const useAdminExperiencesQuery = () => {
  const supabase = useSupabaseClient()

  const experiences = ref<ExperienceRow[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)

  const fetchExperiences = async () => {
    loading.value = true
    error.value = null

    const { data, error: dbError } = await supabase
      .from('experiences')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('start_date', { ascending: false })

    if (dbError) {
      error.value = dbError.message
      loading.value = false
      return
    }

    experiences.value = data ?? []
    loading.value = false
  }

  onMounted(fetchExperiences)

  return {
    experiences,
    loading,
    error,
    refetch: fetchExperiences,
  }
}
