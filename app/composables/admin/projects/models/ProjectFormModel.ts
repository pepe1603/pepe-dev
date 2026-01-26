// app/composables/admin/projects/models/ProjectFormModel.ts

import type { RecordStatus } from "~/types"

export interface ProjectFormModel {
  id: string | undefined

  // core
  title: string
  slug: string
  shortDescription: string
  description: string
  subtitle?: string | null

  // links
  repositoryUrl: string | null
  demoUrl: string | null

  // media
  thumbnailUrl: string | null

  // domain
  status: RecordStatus
  isFeatured?: boolean
  tags?: string[]

  // relations
  technologyIds?: string[]
  relatedExperienceId?: string | null

  createdAt?: string | null | undefined
  updatedAt?: string | null | undefined
}
