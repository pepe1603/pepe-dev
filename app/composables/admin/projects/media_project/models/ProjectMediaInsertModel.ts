// app/composables/admin/projects/media_project/models/ProjectMediaInsertModel.ts
import type { MediaType } from '~/constants/mediaTypes'
import type { RecordStatus } from '~/types'

export interface ProjectMediaInsertModel {
  projectId: string
  url: string
  alt?: string | null
  caption?: string | null
  sortOrder?: number
  type: MediaType
  name?: string
  status?: RecordStatus
}
