//app/composables/admin/skills/models/SkillFormModel.ts
import type { RecordStatus, SkillLevel } from '~/types'

export interface SkillFormModel {
  id?: string

  // core
  name: string
  description: string | null
  category: string | null

  // domain
  level: SkillLevel

  // status
  status: RecordStatus
}
