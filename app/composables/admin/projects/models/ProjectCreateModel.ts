// app/composables/admin/projects/models/ProjectCreateModel.ts
import type { RecordStatus } from '~/types'

export interface ProjectCreateModel {
  // core
  title: string
  slug: string
  shortDescription: string
  description: string
  subtitle?: string | null

  // links
  repositoryUrl?: string | null
  demoUrl?: string | null

  // media
  thumbnailUrl?: string | null

  // domain
  status?: RecordStatus
  isFeatured?: boolean
  tags?: string[]

  // relations
  technologyIds?: string[]
  relatedExperienceId?: string | null
}
