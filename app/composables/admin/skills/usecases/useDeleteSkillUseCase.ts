import { ref } from 'vue'
import { useSupabaseClient } from '#imports'

export const useDeleteSkillUseCase = () => {
  const supabase = useSupabaseClient()

  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const remove = async (id: string) => {
    loading.value = true
    error.value = null
    success.value = false

    const { error: dbError } = await supabase
      .from('skills')
      .delete()
      .eq('id', id)

    if (dbError) {
      error.value = dbError.message
      loading.value = false
      return
    }

    success.value = true
    loading.value = false
  }

  return { remove, loading, error, success }
}
