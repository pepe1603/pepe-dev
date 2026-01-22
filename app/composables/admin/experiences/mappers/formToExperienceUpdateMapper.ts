//app/composables/admin/experiences/mappers/formToExperienceUpdateMapper.ts
import type { TablesUpdate } from '~/types/database.types'
import type { ExperienceFormModel } from '../models/ExperienceFormModel'

export const formToExperienceUpdateMapper = (
  form: ExperienceFormModel
): TablesUpdate<'experiences'> => ({
  title: form.title,
  subtitle: form.subtitle ?? null,
  description: form.description,
  type: form.type,

  start_date: form.startDate,
  end_date: form.endDate ?? null,

  location: form.location ?? null,
  url: form.url ?? null,
  sort_order: form.sortOrder ?? 0,

  related_project_id: form.relatedProjectId ?? null,
  status: form.status,
})
