// app/composables/admin/projects/media_project/models/ProjectMediaInsertModel.ts
import type { MediaType } from '~/constants/mediaTypes'

export interface ProjectMediaInsertModel {
  projectId: string
  url: string
  alt?: string | null
  caption?: string | null
  type: MediaType
  name?: string
}
