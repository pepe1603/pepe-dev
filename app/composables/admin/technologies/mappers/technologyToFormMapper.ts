//app/composables/admin/technologies/mappers/technologyToFormMapper.ts
import type { Tables } from '~/types/database.types'
import type { TechnologyFormModel } from '../models/TechnologyFormModel'

type TechnologyRow = Tables<'technologies'>

export const technologyToFormMapper = (
  technology: TechnologyRow
): TechnologyFormModel => ({
  id: technology.id,

  name: technology.name,
  description: technology.description,

  icon: technology.icon,
  color: technology.color,
  websiteUrl: technology.website_url,

  status: technology.status,
})
