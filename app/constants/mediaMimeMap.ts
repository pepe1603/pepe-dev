// app/constants/mediaMimeMap.ts
import type { MediaType } from '~/constants/mediaTypes'

export const MEDIA_MIME_MAP: Record<MediaType, string[]> = {
  image: [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/svg+xml',
    'image/avif',
  ],
  gif: [
    'image/gif',
  ],
  video: [
    'video/mp4',
    'video/webm',
    'video/quicktime',
    'video/ogg',
    'video/x-msvideo',
  ],
  pdf: [
    'application/pdf',
  ],
}
