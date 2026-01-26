// app/composables/admin/projects/media_project/models/ProjectMediaItemModel.ts
import type { MediaType } from '~/constants/mediaTypes'

export interface ProjectMediaItemModel {
  id: string
  projectId: string
  url: string
  alt: string | null
  caption: string | null

  // extensiones
  type: MediaType
  name?: string | null
}
