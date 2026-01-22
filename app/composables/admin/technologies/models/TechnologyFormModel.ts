// app/composables/admin/techology/models/techologyFormModel.ts

import type { Database } from '~/types/database.types'

export type RecordStatus =
  Database['public']['Enums']['record_status']

export interface TechnologyFormModel {
  id?: string

  name: string
  description: string | null

  icon: string | null
  color: string | null

  websiteUrl: string | null

  status: RecordStatus
}
