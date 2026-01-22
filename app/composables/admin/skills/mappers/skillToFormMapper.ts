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

  status: skill.status,
})
