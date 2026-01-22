//app/composables/admin/ttechnologies/usecases/useSaveTechnologyUseCase.ts
import { ref } from 'vue'
import { useSupabaseClient } from '#imports'

import type { TechnologyFormModel } from '../models/TechnologyFormModel'
import { formToTechnologyInsertMapper } from '../mappers/formToTechnologyInsertMapper'
import { formToTechnologyUpdateMapper } from '../mappers/formToTechnologyUpdateMapper'

export const useSaveTechnologyUseCase = () => {
  const supabase = useSupabaseClient()

  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const save = async (form: TechnologyFormModel) => {
    loading.value = true
    error.value = null
    success.value = false

    const { error: dbError } = form.id
      ? await supabase
          .from('technologies')
          .update(formToTechnologyUpdateMapper(form))
          .eq('id', form.id)
      : await supabase
          .from('technologies')
          .insert(formToTechnologyInsertMapper(form))

    if (dbError) {
      error.value = dbError.message
      loading.value = false
      return
    }

    success.value = true
    loading.value = false
  }

  return {
    save,
    loading,
    error,
    success,
  }
}
