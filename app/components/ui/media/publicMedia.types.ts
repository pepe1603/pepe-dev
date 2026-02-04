//app/components/ui/media/publicMedia.types.ts

export interface PublicMediaItem {
  id: string
  name: string
  src: string
  alt: string
  caption: string | null
}

export interface PublicMediaRendererProps {
  media: PublicMediaItem[]
}
