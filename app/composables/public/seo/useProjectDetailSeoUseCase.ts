// app/composables/public/seo/useProjectDetailSeoUseCase.ts
import type { SeoMeta } from './types'
import type { ProjectDetailView } from '~/composables/public/views/useProjectDetailView'

export const useProjectDetailSeoUseCase = (
  project: Ref<ProjectDetailView | null>,
  slug: string
) => {
  const runtimeConfig = useRuntimeConfig()
  const baseUrl = runtimeConfig.public.siteUrl

  return computed<SeoMeta>(() => {
    // Fallback SSR / loading
    if (!project.value) {
      return {
        title: 'Proyecto | Pepe.dev',
        description: 'Detalle de proyecto',
        canonical: `${baseUrl}/projects/${slug}`,
      }
    }

const ogImage =
  project.value.cover.src
    ? `${baseUrl}${project.value.cover.src}`
    : `${baseUrl}/og/projects.png`

    return {
      title: `${project.value.title} | Pepe.dev`,
      description: project.value.description,
      image: ogImage,
      canonical: `${baseUrl}/projects/${slug}`,
      ogType: 'article',
      twitter: {
        card: 'summary_large_image',
        site: '@pepe_dev',
        creator: '@pepe_dev',
      },
    }

  })
}
