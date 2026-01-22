//app/composables/admin/technologies/mappers/formToTechnologyUpdateMapper.ts
import type { TablesUpdate } from '~/types/database.types'
import type { TechnologyFormModel } from '../models/TechnologyFormModel'

export const formToTechnologyUpdateMapper = (
  form: TechnologyFormModel
): TablesUpdate<'technologies'> => ({
  name: form.name,
  description: form.description,

  icon: form.icon,
  color: form.color,
  website_url: form.websiteUrl,

  status: form.status,
})
