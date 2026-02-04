// app/composables/admin/projects/media_project/usecases/useProjectMediaUseCases.ts
import type { ProjectMediaItemModel } from '../models/ProjectMediaItemModel'
import type { InsertProjectMediaResult } from '../models/ProjectMediaRpcModels'
export const useProjectMediaUseCases = () => {
  const { client } = useSupabase()

  /**
   * Create media
   */
const createMedia = async (payload: {
  projectId: string
  name: string
  url: string
  alt?: string | null
  caption?: string | null
}) => {
  const { data, error } = await client
  .rpc(
    'insert_project_media',
    {
      p_project_id: payload.projectId,
      p_name: payload.name,
      p_url: payload.url,
      p_alt: payload.alt ?? '',
      p_caption: payload.caption ?? '',
    })
  .single<InsertProjectMediaResult>()

  if (error) throw error
  if (!data) throw new Error('No media returned from RPC')

  // 🔥 MAPEO CRÍTICO

  return {
    id: data.id,
    projectId: data.project_id,
    name: data.name,
    url: data.url,
    alt: data.alt,
    caption: data.caption,
    sortOrder: data.sort_order,
  } satisfies ProjectMediaItemModel
}

  /**
   * Update media
   */
    const updateMedia = async (
    id: string,
    payload: Partial<ProjectMediaItemModel>
    ) => {
    const { error } = await client //aqui no da error
        .from('media')
        .update({
        alt: payload.alt ?? null,
        caption: payload.caption ?? null,
        name: payload.name ?? undefined, 
        url: payload.url,
        })
        .eq('id', id)

    if (error) {
        console.error(error)
        throw new Error('Failed to update media')
    }
    }

    /**Metood de media-ordenamiento  */

    const updateMediaOrder = async (
      updates: { id: string; sortOrder: number }[]
    ) => {
      const promises = updates.map(u =>
        client
          .from('media')
          .update({ sort_order: u.sortOrder })
          .eq('id', u.id)
      )

      const results = await Promise.all(promises)

      const error = results.find(r => r.error)?.error
      if (error) {
        console.error(error)
        throw new Error('Failed to update media order')
      }
    }




  /**
   * Delete media
   */
  const deleteMedia = async (id: string) => {
    const { error } = await client
      .from('media')
      .delete()
      .eq('id', id)

    if (error) {
      console.error(error)
      throw new Error('Failed to delete media')
    }
  }

  return {
    createMedia,
    updateMedia,
    deleteMedia,
    updateMediaOrder,
  }
}
