//app/composables/admin/profile/usecases/useUploadProfileMediaUseCase.ts
import { ref } from 'vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'

type MediaType = 'avatar' | 'cv'

export const useUploadProfileMediaUseCase = () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const loading = ref(false)
  const error = ref<string | null>(null)

  const upload = async (file: File, type: MediaType) => {
    if (!user.value) return null

    loading.value = true
    error.value = null

    const userId = user.value.sub //sub contine ele uiid y id no exite
    const fileExt = file.name.split('.').pop()
    const fileName =
      type === 'avatar'
        ? `avatar.${fileExt}`
        : `cv.${fileExt}`

    const filePath = `${userId}/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('profile-media')
      .upload(filePath, file, {
        upsert: true,
        cacheControl: '3600',
      })

    if (uploadError) {
      error.value = uploadError.message
      loading.value = false
      return null
    }

    const { data } = supabase.storage
      .from('profile-media')
      .getPublicUrl(filePath)

    loading.value = false
    return data.publicUrl
  }

  return {
    upload,
    loading,
    error,
  }
}
