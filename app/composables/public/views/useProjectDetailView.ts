import type { PublicProjectDetail } from '~/types/queries'

export interface ProjectDetailView {
  id: string
  title: string
  description: string
  tags: string[]
  demoUrl: string | null
  repoUrl: string | null
  technologies: {
    id: string
    name: string
    color: string | null
    icon: string | null
    website: string | null
  }[]
  gallery: {
    id: string
    src: string
    alt: string
    caption: string | null
  }[]
}

export const useProjectDetailView = (
  project: PublicProjectDetail | null
): ProjectDetailView | null => {
  if (!project) return null

  return {
    id: project.id ?? '',
    title: project.title ?? 'Sin título',
    description: project.description ?? '',
    tags: project.tags ?? [],
    demoUrl: project.demo_url,
    repoUrl: project.repo_url,
    technologies: project.technologies.map(t => ({
      id: t.id,
      name: t.name,
      color: t.color,
      icon: t.icon,
      website: t.website_url,
    })),
    gallery: project.media.map(m => ({
      id: m.id,
      src: m.url,
      alt: m.alt ?? project.title ?? '',
      caption: m.caption,
    })),
  }
}
