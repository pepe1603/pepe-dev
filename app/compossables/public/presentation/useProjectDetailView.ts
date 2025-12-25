import type { PublicProjectDetail } from '~/types/queries'

export const useProjectDetailView = (project: PublicProjectDetail | null) => {
  if (!project) return null

  return {
    id: project.id,
    title: project.title,
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
      alt: m.alt ?? project.title,
      caption: m.caption,
    })),
  }
}
