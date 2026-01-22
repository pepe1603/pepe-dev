// app/composables/admin/projects/mappers/formToProjectInsertMapper.ts
import type { ProjectFormModel } from '../models/ProjectFormModel'

export const formToProjectInsertMapper = (
  form: ProjectFormModel
) => ({
  title: form.title,
  slug: form.slug,
  short_description: form.shortDescription,
  description: form.description,
  subtitle: form.subtitle ?? null,

  repo_url: form.repositoryUrl,
  demo_url: form.demoUrl,

  thumbnail_url: form.thumbnailUrl,

  is_featured: form.isFeatured ?? false,
  tags: form.tags ?? [],

  status: 'draft' as const, // 🔑 siempre draft al crear
})
