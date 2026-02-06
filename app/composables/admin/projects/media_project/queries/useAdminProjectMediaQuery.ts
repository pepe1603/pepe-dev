//app/composables/admin/projects/media_project/queries/useAdminProjectMediaQuery.ts

import { ref } from 'vue'
import { useSupabaseClient } from '#imports'
import type { Media } from '~/types'
import type { ProjectMediaItemModel } from '../models/ProjectMediaItemModel'

export const useAdminProjectMediaQuery = (projectId: string) => {
  const supabase = useSupabaseClient()

  const media = ref<ProjectMediaItemModel[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchMedia = async () => {
    if (!projectId) return

    loading.value = true
    error.value = null

  const { data, error: supabaseError } = await supabase
    .from('media')
    .select(
      `
      id,
      project_id,
      url,
      alt,
      caption,
      name,
      sort_order,
      created_at,
      updated_at
    `
    )
    .order('sort_order')
    .eq('project_id', projectId)

    loading.value = false

    if (supabaseError) {
      console.error(supabaseError)
      error.value = 'Failed to load project media'
      return
    }

    media.value = (data as Media[]).map(
      (row): ProjectMediaItemModel => ({
        id: row.id,
        projectId: row.project_id,
        url: row.url,
        alt: row.alt,
        caption: row.caption,
        name: row.name,
        sortOrder: row.sort_order,
      })
    )
  }

  // auto-fetch al inicializar
  fetchMedia()

  return {
    media,
    loading,
    error,
    refetch: fetchMedia,
  }
}
