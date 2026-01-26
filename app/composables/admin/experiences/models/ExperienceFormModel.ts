//app/composables/admin/experiences/models/ExperienceFormModel.ts

import type { ExperienceType, RecordStatus } from "~/types"

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

  // relations
  relatedProjectId?: string | null

  // domain
  status: RecordStatus
}

