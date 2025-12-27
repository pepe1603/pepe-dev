import type { SeoMeta } from "./types"

//app/composables/public/seo/useHomeSeoUseCase.ts
export const useHomeSeoUseCase = () => {
  const runtimeConfig = useRuntimeConfig()
  const baseUrl = runtimeConfig.public.siteUrl

  return computed<SeoMeta>(() => ({
    title: 'Pepe.dev — Fullstack Developer',
    description:
      'Portafolio profesional de Pepe.dev. Proyectos, experiencia y habilidades en desarrollo web.',
    image: `${baseUrl}/og/home.png`,
    canonical: `${baseUrl}/`,
    twitter: {
      card: 'summary_large_image',
      site: '@pepe_dev',
      creator: '@pepe_dev',
    },
  }))
}
