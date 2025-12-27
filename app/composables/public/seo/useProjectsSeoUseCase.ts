//app/composables/public/seo/useProjectsSeoUseCase.ts
import type { SeoMeta } from './types'

export const useProjectsSeoUseCase = () => {
  return computed<SeoMeta>(() => ({
    title: 'Proyectos | Portfolio',
    description:
      'Listado de proyectos desarrollados, tecnologías y casos de estudio',
  }))
}
