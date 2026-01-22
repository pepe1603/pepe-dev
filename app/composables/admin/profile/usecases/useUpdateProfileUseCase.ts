//app/composables/admin/profile/usecases/useUpdateProfileUseCase.ts
import { ref } from 'vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'

import type { ProfileFormModel } from '../models/ProfileFormModel'
import { formToProfileUpdateMapper } from '../mappers/formToProfileUpdateMapper'

export const useUpdateProfileUseCase = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const updateProfile = async (form: ProfileFormModel) => {
    if (!user.value) return

    loading.value = true
    error.value = null
    success.value = false

    const payload = formToProfileUpdateMapper(form)

    console.log(' data update (useUpdateProfileUseCase) : ', payload)

    const { error: dbError } = await supabase
      .from('profiles')
      .update(payload)
      .eq('id', user.value.sub) //usamos sub no id ,sun continene el uuid

    if (dbError) {
      console.error('Ocurrio un error (useUpdateProfileUseCase): ', error, dbError.message, dbError.cause)
      error.value = dbError.message
      loading.value = false
      return
    }

    success.value = true
    loading.value = false
  }

  return {
    updateProfile,
    loading,
    error,
    success,
  }
}
