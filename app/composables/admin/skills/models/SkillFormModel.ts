//app/composables/admin/skills/models/SkillFormModel.ts
import type { Database, Enums } from '~/types/database.types'

export type RecordStatus =
  Database['public']['Enums']['record_status']


export interface SkillFormModel {
  id?: string

  // core
  name: string
  description: string | null
  category: string | null

  // domain
  level: Enums<'skill_level'>
  displayOrder: number

  // status
  status: Enums<'record_status'>
}
