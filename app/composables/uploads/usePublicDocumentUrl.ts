//app/composables/uploads/usePublicDocumentUrl.ts

export const usePublicDocumentUrl = (path: string | null) => {
  if (!path) return null

  const supabase = useSupabaseClient()
  const { data } = supabase
    .storage
    .from('documents')
    .getPublicUrl(path)

  return data.publicUrl
}
