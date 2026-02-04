// app/composables/public/views/useProjectDetailView.ts
import type { PublicProjectDetail } from '~/types/queries'

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
    src: string
    alt: string
    caption: string | null
    sortOrder: number | null
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

  // 🔑 Guard estructural
  if (!project.id || !project.title || !project.slug) {
    return null
  }

//ordenamos datos
const mediaList = [...(project.media ?? [])]
  .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))



  const coverSrc =
    project.thumbnail_url ??
    mediaList[0]?.url ??
    '/project-placeholder.png'

  return {
    id: project.id,
    title: project.title,

    excerpt: project.short_description ?? '',
    description: project.description ?? '',

    featured: project.is_featured ?? false,
    publishedAt: project.published_at,

    tags: project.tags ?? [],

    demoUrl: project.demo_url,
    repoUrl: project.repo_url,

    cover: {
      src: coverSrc,
      alt: project.title,
    },

    technologies: (project.technologies ?? []).map(t => ({
      id: t.id,
      name: t.name,
      color: t.color,
      icon: t.icon,
      website: t.website_url,
    })),

    media: mediaList.map(m => ({
      id: m.id,
      name: m.name,
      src: m.url,
      alt: m.alt ?? project.title ?? '',
      caption: m.caption,
      sortOrder: m.sort_order,
    })),

  }
}
