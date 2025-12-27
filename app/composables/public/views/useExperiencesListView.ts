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
  }))
}
