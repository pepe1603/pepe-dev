//app/composables/public/views/useExperiencesListView.ts
import type { PublicExperienceItem } from '~/types/queries'
import type { ExperienceType } from '~/types/domain'

export interface ExperienceListItemView {
  id: string
  title: string
  subtitle: string
  type: ExperienceType
  period: string
  location: string | null
  url: string | null

  project?: {
    id: string
    title: string | null
    slug: string | null
    thumbnail_url: string | null
  } | null
}

export const useExperiencesListView = (
  experiences: PublicExperienceItem[]
): ExperienceListItemView[] => {
  return experiences
    .filter(
      (exp): exp is PublicExperienceItem & {
        id: string
        title: string
        type: ExperienceType
        start_date: string
      } =>
        Boolean(exp.id && exp.title && exp.type && exp.start_date)
    )
    .map(exp => {
      const period = exp.end_date
        ? `${exp.start_date} - ${exp.end_date}`
        : `${exp.start_date} - Present`

      return {
        id: exp.id,
        title: exp.title,
        subtitle: exp.subtitle ?? '',
        type: exp.type,
        period,
        location: exp.location,
        url: exp.url,

        project: exp.project_id
          ? {
              id: exp.project_id,
              title: exp.project_title,
              slug: exp.project_slug,
              thumbnail_url: exp.project_thumbnail_url,
            }
          : null,
      }
    })
}
