// app/composables/admin/profile/queries/useAdminProfileQuery.ts
import { ref, watch } from 'vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'
import type { Tables } from '~/types/database.types'
import type { ProfileFormModel } from '../models/ProfileFormModel'
import { profileToFormMapper } from '../mappers/profileToFromMapper'

type ProfileRow = Tables<'profiles'>

export const useAdminProfileQuery = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const form = ref<ProfileFormModel | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  const fetchProfile = async (userId: string) => {
    loading.value = true
    error.value = null

    const { data, error: dbError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single<ProfileRow>()

    if (dbError) {
      console.error('error en dbError (useAdminProfileQuery) : ', dbError);
      error.value = dbError.message
      loading.value = false
      return
    }

    form.value = profileToFormMapper(data)

    loading.value = false
  }

  // 🔑 CLAVE: reaccionamos a user.sub (NO user.id)
  watch(
    () => user.value?.sub,
    (userId) => {
      if (userId) {
        fetchProfile(userId)
      }
    },
    { immediate: true }
  )

  return {
    form,
    loading,
    error,
    refetch: () => {
      if (user.value?.sub) fetchProfile(user.value.sub)
    },
  }
}
