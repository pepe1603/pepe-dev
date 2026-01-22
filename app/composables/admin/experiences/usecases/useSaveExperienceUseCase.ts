//app/composables/admin/experiences/usecases/useSaveExperienceUseCase.ts
import { ref } from 'vue'
import { useSupabaseClient } from '#imports'

import type { ExperienceFormModel } from '../models/ExperienceFormModel'
import { formToExperienceInsertMapper } from '../mappers/formToExperienceInsertMapper'
import { formToExperienceUpdateMapper } from '../mappers/formToExperienceUpdateMapper'

export const useSaveExperienceUseCase = () => {
  const supabase = useSupabaseClient()

  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const save = async (form: ExperienceFormModel) => {
    loading.value = true
    error.value = null
    success.value = false

    const { error: dbError } = form.id
      ? await supabase
          .from('experiences')
          .update(formToExperienceUpdateMapper(form))
          .eq('id', form.id)
      : await supabase
          .from('experiences')
          .insert(formToExperienceInsertMapper(form))

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
