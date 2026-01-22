import { ref } from 'vue'
import { useSupabaseClient } from '#imports'

export const useUpdateSkillStatusUseCase = () => {
  const supabase = useSupabaseClient()

  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const updateStatus = async (id: string, status: 'draft' | 'published' | 'archived') => {
    loading.value = true
    error.value = null
    success.value = false

    const { error: dbError } = await supabase
      .from('skills')
      .update({ status })
      .eq('id', id)

    if (dbError) {
      error.value = dbError.message
      loading.value = false
      return
    }

    success.value = true
    loading.value = false
  }

  return { updateStatus, loading, error, success }
}
