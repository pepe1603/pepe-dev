//app/composables/admin/experiences/models/ExperienceFormModel.ts
import type { Database } from '~/types/database.types'

export type ExperienceType =
  Database['public']['Enums']['experience_type']

export type RecordStatus =
  Database['public']['Enums']['record_status']

export interface ExperienceFormModel {
  id?: string

  // core
  title: string
  subtitle?: string | null
  description: string
  type: ExperienceType

  // time
  startDate: string
  endDate?: string | null

  // meta
  location?: string | null
  url?: string | null
  sortOrder?: number

  // relations
  relatedProjectId?: string | null

  // domain
  status: RecordStatus
}
