// app/composables/admin/projects/mappers/formToProjectUpdateMapper.ts
import type { ProjectFormModel } from '../models/ProjectFormModel'

type ProjectUpdatePayload = Record<string, any>

export const formToProjectUpdateMapper = (
  form: ProjectFormModel
): ProjectUpdatePayload => {
  const payload: ProjectUpdatePayload = {
    title: form.title,
    slug: form.slug,
    short_description: form.shortDescription,
    description: form.description,
    subtitle: form.subtitle,
    repo_url: form.repositoryUrl,
    demo_url: form.demoUrl,
    thumbnail_url: form.thumbnailUrl,
    status: form.status,
    is_featured: form.isFeatured,
    tags: form.tags,
  }

  // ✅ crear nuevo objeto sin undefined
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined)
  )
}


