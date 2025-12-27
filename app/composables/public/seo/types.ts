// app/composables/public/seo/types.ts
export interface SeoMeta {
  title: string
  description?: string
  image?: string | null
  canonical?: string
  robots?: string
  twitter?: {
    card?: 'summary' | 'summary_large_image'
    site?: string
    creator?: string
  }
}
