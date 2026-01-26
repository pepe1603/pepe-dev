//// app/composables/admin/projects/usecases/useUpdateProjectStatusUseCase.ts
import { ref } from 'vue'
import { useSupabaseClient } from '#imports'
import type { RecordStatus } from '~/types'

export const useUpdateProjectStatusUseCase = () => {
  const supabase = useSupabaseClient()

  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const updateStatus = async (id: string, status: RecordStatus) => {
    loading.value = true
    error.value = null
    success.value = false

    const { error: dbError } = await supabase
      .from('projects')
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
