//app/composables/public/seo/useAboutSeoUseCase.ts
import { usePublicProfileCase } from '../usecases/usePublicProfileUseCase'
import type { SeoMetaView } from './types'

export const useAboutSeoUseCase = () => {
  const { data: profile } = usePublicProfileCase()

  return computed<SeoMetaView>(() => ({
    title: profile?.value?.name
      ? `Sobre mí | ${profile.value.name}`
      : 'Sobre mí',
    description:
      profile.value?.bio ??
      'Conoce más sobre mi experiencia y trayectoria profesional',
    image: profile.value?.avatar,
  }))
}
