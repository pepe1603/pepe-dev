//app/composables/admin/experiences/mappers/experienceToFormMapper.ts
import type { Tables } from '~/types/database.types'
import type { ExperienceFormModel } from '../models/ExperienceFormModel'

type ExperienceRow = Tables<'experiences'>

export const experienceToFormMapper = (
  row: ExperienceRow
): ExperienceFormModel => ({
  id: row.id,

  title: row.title,
  subtitle: row.subtitle,
  description: row.description,
  type: row.type,

  startDate: row.start_date,
  endDate: row.end_date,

  location: row.location,
  url: row.url,
  sortOrder: row.sort_order,

  relatedProjectId: row.related_project_id,
  status: row.status,
})
