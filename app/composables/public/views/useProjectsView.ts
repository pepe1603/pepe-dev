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

export const useProjectsView = (
  projects: PublicProjectListItem[]
): ProjectView[] => {
  return projects
    .filter(
      (p): p is PublicProjectListItem & {
        id: string
        title: string
        slug: string
      } =>
        Boolean(p.id && p.title && p.slug)
    )
    .map(project => ({
      id: project.id,
      title: project.title,
      slug: project.slug,
      excerpt: project.short_description,
      featured: project.is_featured ?? false,
      thumbnail: project.thumbnail_url ?? '/project-placeholder.png',
      publishedAt: project.published_at
        ? new Date(project.published_at).toLocaleDateString()
        : null,
    }))
}
