//app/composables/public/seo/useAboutSeoUseCase.ts
import { usePublicProfileCase } from '../usecases/usePublicProfileUseCase'
import type { SeoMeta } from './types'

export const useAboutSeoUseCase = () => {
  const { data: profile } = usePublicProfileCase()

  return computed<SeoMeta>(() => ({
    title: profile?.value?.name
      ? `Sobre mí | ${profile.value.name}`
      : 'Sobre mí',
    description:
    profile.value?.bio ??
    'Perfil profesional, habilidades, tecnologías y experiencia en desarrollo de software',

    image: profile.value?.avatar,
  }))
}
