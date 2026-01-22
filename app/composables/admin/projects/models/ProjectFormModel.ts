// app/composables/admin/projects/models/ProjectFormModel.ts

import type { Database } from "~/types"


export type RecordStatus =
  Database['public']['Enums']['record_status']

export interface ProjectFormModel {
  id?: string

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
  status: 'draft' | 'published' | 'archived' | 'trashed'
  isFeatured?: boolean
  tags?: string[]

  // relations
  technologyIds?: string[]
  relatedExperienceId?: string | null
}
