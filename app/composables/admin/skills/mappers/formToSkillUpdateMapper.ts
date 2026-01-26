////app/composables/admin/skills/mappers/formToSkillUpdateMapper.ts
import type { TablesUpdate } from '~/types/database.types'
import type { SkillFormModel } from '../models/SkillFormModel'

export const formToSkillUpdateMapper = (
  form: SkillFormModel
): TablesUpdate<'skills'> => ({
  name: form.name,
  description: form.description ?? null,
  category: form.category ?? null,

  level: form.level,
  status: form.status,
})
