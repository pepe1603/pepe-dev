// app/composables/admin/projects/mappers/projectToFormMapper.ts
import type { Project } from '~/types'
import type { ProjectFormModel } from '../models/ProjectFormModel'


export const projectToFormMapper = (
  project: Project
): ProjectFormModel => ({
  id: project.id,

  title: project.title,
  slug: project.slug,
  shortDescription: project.short_description,
  description: project.description,
  subtitle: project.subtitle ?? null,

  repositoryUrl: project.repo_url ?? null,
  demoUrl: project.demo_url ?? null,

  thumbnailUrl: project.thumbnail_url ?? null,

  status: project.status,
  isFeatured: project.is_featured ?? false,
  tags: project.tags ?? [],

  // Para UI solamente
  createdAt: project.created_at,
  updatedAt: project.updated_at,
})
