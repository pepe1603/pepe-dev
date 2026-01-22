//app/composables/projects/useProjectFormSchema.ts
import { z } from 'zod'

export const PROJECT_STATUSES = [
  'draft',
  'published',
  'archived',
  'trashed',
] as const

export type ProjectStatus = typeof PROJECT_STATUSES[number]

export const projectFormSchema = z.object({
  id: z.string().uuid().optional(),

  title: z
    .string()
    .min(3, 'Title must be at least 3 characters'),

  slug: z
    .string()
    .min(3, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must be URL friendly'),

  subtitle: z.string().nullable(),

  shortDescription: z
    .string()
    .min(10, 'Short description is too short'),

  description: z
    .string()
    .min(20, 'Description is too short'),

  thumbnailUrl: z.string().url().nullable(),

  repositoryUrl: z.string().url().nullable(),

  demoUrl: z.string().url().nullable(),

  isFeatured: z.boolean(),

  tags: z.array(z.string()).default([]),

  status: z.enum(PROJECT_STATUSES),
})

export type ProjectFormSchema = z.infer<typeof projectFormSchema>
