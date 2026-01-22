// app/composables/admin/projects/mappers/projectToFormMapper.ts
import type { Tables } from '~/types/database.types'
import type { ProjectFormModel } from '../models/ProjectFormModel'

type ProjectRow = Tables<'projects'>

export const projectToFormMapper = (
  project: ProjectRow
): ProjectFormModel => ({
  id: project.id,

  title: project.title,
  slug: project.slug,
  shortDescription: project.short_description,
  description: project.description,
  subtitle: project.subtitle,

  repositoryUrl: project.repo_url,
  demoUrl: project.demo_url,

  thumbnailUrl: project.thumbnail_url,

  status: project.status,
  isFeatured: project.is_featured ?? false,
  tags: project.tags ?? [],
})
