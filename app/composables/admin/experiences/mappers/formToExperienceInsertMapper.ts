//app/composables/admin/experiences/mappers/formToExperienceInsertMapper.ts
import type { ExperienceFormModel } from '../models/ExperienceFormModel'

export const formToExperienceInsertMapper = (
  form: ExperienceFormModel
) => ({
  title: form.title,
  subtitle: form.subtitle ?? null,
  description: form.description,
  type: form.type,

  start_date: form.startDate,
  end_date: form.endDate ?? null,

  location: form.location ?? null,
  url: form.url ?? null,

  related_project_id: form.relatedProjectId ?? null,

  status: 'draft' as const, // 🔑 siempre draft al crear
})
