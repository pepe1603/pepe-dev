//app/composables/admin/skills/mappers/formToSkillInsertMapper.ts
import type { SkillFormModel } from '../models/SkillFormModel'

export const formToSkillInsertMapper = (
  form: SkillFormModel
) => ({
  name: form.name,
  description: form.description ?? null,
  category: form.category ?? null,

  level: form.level,
  display_order: form.displayOrder,

  status: 'draft' as const, // siempre draft al crear
})
