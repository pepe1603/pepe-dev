// app/composables/public/views/useProjectsView.ts
import type { PublicProjectListItem } from '~/types/queries'

export interface ProjectView {
  id: string
  title: string
  slug: string
  excerpt: string | null
  featured: boolean
  thumbnail: string
  publishedAt: string | null
}

export const useProjectsView = (projects: PublicProjectListItem[]): ProjectView[] => {
  return projects.map(project => ({
    id: project.id ?? '', // nunca null
    title: project.title ?? 'Sin titulo', // fallback por defecto
    slug: project.slug ?? '', // importante: antes podía ser null
    excerpt: project.short_description ?? null, 
    featured: project.is_featured ?? false, // fallback a false si es null
    thumbnail: project.thumbnail_url ?? '/project-placeholder.png',
    publishedAt: project.published_at
      ? new Date(project.published_at).toLocaleDateString()
      : null,
  }))
}
