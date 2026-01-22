//app/composables/admin/technologies/mappers/formToTechnologyInsertMapper.ts
import type { TechnologyFormModel } from '../models/TechnologyFormModel'

export const formToTechnologyInsertMapper = (
  form: TechnologyFormModel
) => ({
  name: form.name,
  description: form.description,

  icon: form.icon,
  color: form.color,
  website_url: form.websiteUrl,

  status: 'draft' as const, // 🔑 siempre draft al crear
})
