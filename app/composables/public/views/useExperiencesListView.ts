//app/composables/public/views/useExperiencesListView.ts
import type { PublicExperienceItem } from '~/types/queries'

export interface ExperienceListItemView {
  id: string
  title: string
  subtitle: string
  type: string
  period: string
  location: string | null
  url: string | null

  project?: {
    id: string  | null
    title: string | null
    slug: string |  null
    thumbnail_url: string | null
  } | null
}

export const useExperiencesListView = (
  experiences: PublicExperienceItem[]
): ExperienceListItemView[] => {
  return experiences.map(exp => ({
    id: exp.id ?? '',
    title: exp.title ?? 'Sin título',
    subtitle: exp.subtitle ?? '',
    type: exp.type ?? 'work',
    period: exp.end_date
      ? `${exp.start_date} - ${exp.end_date}`
      : `${exp.start_date} - Present`,
    location: exp.location ?? null,
    url: exp.url ?? null,

    project: exp.project_id
      ? {
          id: exp.project_id,
          title: exp.project_title,
          slug: exp.project_slug,
          thumbnail_url: exp.project_thumbnail_url,
        }
      : null,
  }))
}


