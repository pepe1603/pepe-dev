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
  return technologies
    .filter(t => t.id && t.name) // 🔹 eliminamos registros inválidos
    .map(t => ({
      id: t.id!,
      name: t.name!,
      icon: t.icon ?? null,
      color: t.color ?? null,
      websiteUrl: t.website_url ?? null,
      description: t.description ?? null,
    }))
}

