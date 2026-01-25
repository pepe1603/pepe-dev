//app/composables/public/views/useExperienceDetailView.ts
import type { PublicExperienceItem } from '~/types/queries'

export interface ExperienceDetailView {
  id: string| null
  title: string
  subtitle: string
  type: string
  period: string
  location: string | null
  url: string | null
  description: string
}

export const useExperienceDetailView = (
  experience: PublicExperienceItem | null
): ExperienceDetailView | null => {
  if (!experience) return null

  return {
    id: experience.id ?? null ,
    title: experience.title ?? 'Sin título',
    subtitle: experience.subtitle ?? 'Sin subtitulo',
    type: experience.type ?? 'work',
    period: experience.end_date
      ? `${experience.start_date} - ${experience.end_date}`
      : `${experience.start_date} - Present`,
    location: experience.location ?? null,
    url: experience.url ?? null,
    description: experience.subtitle ?? 'sin descripcion',
  }
}
