// app/composables/admin/experiences/usecases/useDeleteExperienceUseCase.ts
import { ref } from 'vue'
import { useSupabaseClient } from '#imports'

export const useDeleteExperienceUseCase = () => {
  const supabase = useSupabaseClient()

  const loading = ref(false)
  const error = ref<string | null>(null)

  const remove = async (id: string) => {
    loading.value = true
    error.value = null

    const { error: dbError } = await supabase
      .from('experiences')
      .delete()
      .eq('id', id)

    if (dbError) {
      error.value = dbError.message
      loading.value = false
      return false
    }

    loading.value = false
    return true
  }

  return { remove, loading, error }
}
