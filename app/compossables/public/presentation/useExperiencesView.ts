import type { PublicExperienceItem } from '~/types/queries'

export const useExperiencesView = (experiences: PublicExperienceItem[]) => {
  return experiences.map(exp => ({
    id: exp.id,
    title: exp.title,
    subtitle: exp.subtitle,
    type: exp.type,
    period: exp.end_date
      ? `${exp.start_date} – ${exp.end_date}`
      : `${exp.start_date} – Present`,
    location: exp.location,
    url: exp.url,
  }))
}
