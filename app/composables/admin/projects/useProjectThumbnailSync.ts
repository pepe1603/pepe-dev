//composables/admin/projects/useProjectThumbnailSync.ts

import { useSupabaseClient } from '#imports'

type SyncParams = {
  originalSlug: string
  newSlug: string
  thumbnailUrl: string | null
}

export const useProjectThumbnailSync = () => {
  const supabase = useSupabaseClient()

  const isLocalThumbnail = (url: string) =>
    url.includes('/project-thumbnails/')

  const getExtensionFromUrl = (url: string) =>
    url.split('.').pop()?.split('?')[0]

  const buildPublicUrl = (path: string) =>
    supabase.storage
      .from('project-thumbnails')
      .getPublicUrl(path)
      .data.publicUrl

  const sync = async ({
    originalSlug,
    newSlug,
    thumbnailUrl
  }: SyncParams): Promise<string | null> => {
    // 1️⃣ No thumbnail → nada que hacer
    if (!thumbnailUrl) return null

    // 2️⃣ No cambió el slug → nada que hacer
    if (originalSlug === newSlug) return thumbnailUrl

    // 3️⃣ Thumbnail externo → no tocar
    if (!isLocalThumbnail(thumbnailUrl)) return thumbnailUrl

    const ext = getExtensionFromUrl(thumbnailUrl)
    if (!ext) return thumbnailUrl

    const oldPath = `${originalSlug}.${ext}`
    const newPath = `${newSlug}.${ext}`

    // 4️⃣ COPY
    const { error: copyError } = await supabase.storage
      .from('project-thumbnails')
      .copy(oldPath, newPath)

    if (copyError) {
      throw new Error('Failed to copy thumbnail')
    }

    // 5️⃣ DELETE old (rollback safe)
    const { error: deleteError } = await supabase.storage
      .from('project-thumbnails')
      .remove([oldPath])

    if (deleteError) {
      // ⚠️ ROLLBACK: borrar el nuevo
      await supabase.storage
        .from('project-thumbnails')
        .remove([newPath])

      throw new Error('Failed to delete old thumbnail (rollback applied)')
    }

    // 6️⃣ Return new public URL
    return buildPublicUrl(newPath)
  }

  return { sync }
}
