//app/composables/admin/experiences/usecases/useUpdateExperienceStatusUseCase.ts
import { ref } from 'vue'
import { useSupabaseClient } from '#imports'
import type { RecordStatus } from '../models/ExperienceFormModel'

export const useUpdateExperienceStatusUseCase = () => {
  const supabase = useSupabaseClient()

  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const updateStatus = async (
    id: string,
    status: RecordStatus
  ) => {
    loading.value = true
    error.value = null
    success.value = false

    const { error: dbError } = await supabase
      .from('experiences')
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

  return {
    updateStatus,
    loading,
    error,
    success,
  }
}
