// app/composables/admin/technologies/usecases/useDeleteTechnologyUseCase.ts
import { ref } from 'vue'
import { useSupabaseClient } from '#imports'

export const useDeleteTechnologyUseCase = () => {
  const supabase = useSupabaseClient()
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const deleteTechnology = async (id: string) => {
    loading.value = true
    error.value = null
    success.value = false

    const { error: dbError } = await supabase
      .from('technologies')
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

  return { deleteTechnology, loading, error, success }
}
