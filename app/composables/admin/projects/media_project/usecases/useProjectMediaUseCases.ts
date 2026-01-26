// app/composables/admin/projects/media_project/usecases/useProjectMediaUseCases.ts
import { useSupabaseClient } from '#imports'
import type { ProjectMediaItemModel } from '../models/ProjectMediaItemModel'
import type { ProjectMediaInsertModel } from '../models/ProjectMediaInsertModel'
import type { Media } from '~/types'
import type { MediaType } from '~/constants/mediaTypes'

export const useProjectMediaUseCases = () => {
  const supabase = useSupabaseClient()

  /**
   * Create media
   */
const createMedia = async (
  payload: ProjectMediaInsertModel
): Promise<ProjectMediaItemModel> => {
  const { data, error } = await supabase
    .from('media')
    .insert({
      project_id: payload.projectId,
      url: payload.url,
      alt: payload.alt ?? null,
      caption: payload.caption ?? null,
      type: payload.type,
      name: payload.name ?? 'project-media',
    })
    .select()
    .single()

  if (error || !data) {
    console.error(error)
    throw new Error('Failed to create media')
  }

  const row = data as Media

  return {
    id: row.id,
    projectId: row.project_id,
    url: row.url,
    alt: row.alt,
    caption: row.caption,
    type: row.type as MediaType,
    name: row.name
  }
}


  /**
   * Update media
   */
    const updateMedia = async (
    id: string,
    payload: Partial<ProjectMediaItemModel>
    ) => {
    const { error } = await supabase
        .from('media')
        .update({
        alt: payload.alt ?? null,
        caption: payload.caption ?? null,
        type: payload.type,
        name: payload.name ?? undefined, 
        url: payload.url,
        })
        .eq('id', id)

    if (error) {
        console.error(error)
        throw new Error('Failed to update media')
    }
    }


  /**
   * Delete media
   */
  const deleteMedia = async (id: string) => {
    const { error } = await supabase
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
  }
}
