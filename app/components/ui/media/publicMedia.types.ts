//app/components/ui/media/publicMedia.types.ts
import type { MediaType } from '~/constants/mediaTypes'

export interface PublicMediaItem {
  id: string
  name: string
  type: MediaType
  src: string
  alt: string
  caption: string | null
}

export interface PublicMediaRendererProps {
  media: PublicMediaItem[]
}
