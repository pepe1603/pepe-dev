////app/composables/admin/skills/queries/useSaveSkillUseCase.ts
import { ref } from 'vue'
import { useSupabaseClient } from '#imports'

import type { SkillFormModel } from '../models/SkillFormModel'
import { formToSkillInsertMapper } from '../mappers/formToSkillInsertMapper'
import { formToSkillUpdateMapper } from '../mappers/formToSkillUpdateMapper'

export const useSaveSkillUseCase = () => {
  const supabase = useSupabaseClient()

  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const save = async (form: SkillFormModel) => {
    loading.value = true
    error.value = null
    success.value = false

    const { error: dbError } = form.id
      ? await supabase
          .from('skills')
          .update(formToSkillUpdateMapper(form))
          .eq('id', form.id)
      : await supabase
          .from('skills')
          .insert(formToSkillInsertMapper(form))

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
