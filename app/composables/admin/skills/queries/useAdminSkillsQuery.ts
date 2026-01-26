////app/composables/admin/skills/queries/ussseADminSkillQuery.ts
import { ref, onMounted } from 'vue'
import { useSupabaseClient } from '#imports'
import type { Skill } from '~/types'

export const useAdminSkillsQuery = () => {
  const supabase = useSupabaseClient()

  const skills = ref<Skill[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)

  const fetchSkills = async () => {
    loading.value = true
    error.value = null

    const { data, error: dbError } = await supabase
      .from('skills')
      .select('*')
      .order('name', { ascending: true })



    if (dbError) {
      error.value = dbError.message
      loading.value = false
      return
    }

    console.log('fetchSkills result:', data)


    skills.value = data ?? []
    loading.value = false
  }

  onMounted(fetchSkills)

  return {
    skills,
    loading,
    error,
    refetch: fetchSkills,
  }
}
