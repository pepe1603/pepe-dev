//app/composables/admin/experiences/mappers/experienceToFormMapper.ts
import type { Experience } from '~/types'
import type { ExperienceFormModel } from '../models/ExperienceFormModel'


export const experienceToFormMapper = (
  row: Experience
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

  relatedProjectId: row.related_project_id,
  status: row.status,
})
