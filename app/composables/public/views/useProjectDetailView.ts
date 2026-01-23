// app/composables/public/views/useProjectDetailView.ts
import type { PublicProjectDetail } from '~/types/queries'
import type { MediaType } from '~/constants/mediaTypes'

export interface ProjectDetailView {
  id: string
  title: string

  excerpt: string
  description: string

  featured: boolean
  publishedAt: string | null

  tags: string[]

  demoUrl: string | null
  repoUrl: string | null

  cover: {
    src: string
    alt: string
  }

  media: {
    id: string
    name: string
    type: MediaType
    src: string
    alt: string
    caption: string | null
  }[]

  technologies: {
    id: string
    name: string
    color: string | null
    icon: string | null
    website: string | null
  }[]
}

export const useProjectDetailView = (
  project: PublicProjectDetail | null
): ProjectDetailView | null => {

  if (!project) return null

  const mediaSorted = [...(project.media ?? [])].sort(
    (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
  )

  const coverSrc =
    project.thumbnail_url ??
    mediaSorted[0]?.url ??
    '/project-placeholder.png'

  return {
    id: project.id ?? '',
    title: project.title ?? 'Sin título',

    excerpt: project.short_description ?? '',
    description: project.description ?? '',

    featured: project.is_featured ?? false,
    publishedAt: project.published_at,

    tags: project.tags ?? [],

    demoUrl: project.demo_url,
    repoUrl: project.repo_url,

    cover: {
      src: coverSrc,
      alt: project.title ?? '',
    },

    technologies: project.technologies.map(t => ({
      id: t.id,
      name: t.name,
      color: t.color,
      icon: t.icon,
      website: t.website_url,
    })),

    media: mediaSorted.map(m => ({
      id: m.id,
      name: m.name,              
      type: m.type as MediaType, 
      src: m.url,
      alt: m.alt ?? project.title ?? '',
      caption: m.caption,
    })),
  }
}
