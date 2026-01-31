import type { SeoMeta } from "./types"

//app/composables/public/seo/useHomeSeoUseCase.ts
export const useHomeSeoUseCase = () => {
  const runtimeConfig = useRuntimeConfig()
  const baseUrl = runtimeConfig.public.siteUrl

  return computed<SeoMeta>(() => ({
    title: 'Pepe.dev — Full-Stack Developer',
description:
  'Portafolio profesional de Pepe.dev. Desarrollo web full-stack, proyectos reales y experiencia profesional.',
    image: `${baseUrl}/og/home.png`,
    canonical: `${baseUrl}/`,
    twitter: {
      card: 'summary_large_image',
      site: '@pepe_dev',
      creator: '@pepe_dev',
    },
  }))
}
