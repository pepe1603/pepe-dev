// app/constants/mediaTypes.ts

/**
 * Media types supported by the platform.
 * Used in admin forms, rendering logic and future analytics.
 */

export const MEDIA_TYPES = [
  'image',
  'gif',
  'video',
  'pdf',
] as const

export type MediaType = typeof MEDIA_TYPES[number]
