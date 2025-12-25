import type { PublicProjectListItem } from '~/types/queries'

export const useProjectsView = (projects: PublicProjectListItem[]) => {
  return projects.map(project => ({
    id: project.id,
    title: project.title,
    slug: project.slug,
    excerpt: project.short_description,
    featured: project.is_featured,
    thumbnail: project.thumbnail_url ?? '/project-placeholder.png',
    publishedAt: project.published_at
      ? new Date(project.published_at).toLocaleDateString()
      : null,
  }))
}
