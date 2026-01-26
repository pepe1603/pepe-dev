////app/composables/admin/skills/mappers/skillToFormMapper.ts
import type { Tables } from '~/types/database.types'
import type { SkillFormModel } from '../models/SkillFormModel'

type SkillRow = Tables<'skills'>

export const skillToFormMapper = (
  skill: SkillRow
): SkillFormModel => ({
  id: skill.id,

  name: skill.name,
  description: skill.description,
  category: skill.category ?? null,

  level: skill.level,
  displayOrder: skill.display_order,
  /**Property 'display_order' does not exist on type '{ category: string | null; created_at: string; description: string | null; id: string; level: "basic" | "intermediate" | "advanced" | "expert"; name: string; published_at: string | null; status: "draft" | ... 2 more ... | "trashed"; updated_at: string | null; }'.ts(2339)
any */

  status: skill.status,
})
