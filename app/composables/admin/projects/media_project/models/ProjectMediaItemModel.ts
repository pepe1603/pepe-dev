// app/composables/admin/projects/media_project/models/ProjectMediaItemModel.ts
import type { MediaType } from '~/constants/mediaTypes'
import type { RecordStatus } from '~/types'

export interface ProjectMediaItemModel {
  id: string
  projectId: string
  url: string
  alt: string | null
  caption: string | null
  sortOrder: number

  // extensiones
  type: MediaType
  name?: string | null
  status?: RecordStatus
}
