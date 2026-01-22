// app/composables/public/views/useTechnologiesView.ts
import type { PublicTechnologyItem } from '~/types/queries'

export interface TechnologyViewModel {
  id: string
  name: string
  icon: string | null
  color: string | null
  websiteUrl: string | null
  description?: string | null
}

export const useTechnologiesView = (
  technologies: PublicTechnologyItem[]
): TechnologyViewModel[] => {
  return technologies.map(t => ({
    id: t.id,
    name: t.name,
    icon: t.icon,
    color: t.color,
    websiteUrl: t.website_url,
    description: t.description
  }))
}
