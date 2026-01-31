//app/composables/public/seo/useProjectsSeoUseCase.ts
import type { SeoMeta } from './types'

export const useProjectsSeoUseCase = () => {
  return computed<SeoMeta>(() => ({
    title: 'Proyectos | Pepe.dev',
    description:
      'Proyectos desarrollados, casos de estudio y tecnologías utilizadas en proyectos reales',

  }))
}
