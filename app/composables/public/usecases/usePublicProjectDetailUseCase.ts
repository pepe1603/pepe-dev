// app/composables/public/usecases/usePublicProjectDetailUseCase.ts
import { usePublicProjectBySlugQuery } from '../queries/usePublicProjectBySlugQuery'
import { useProjectDetailView } from '../views/useProjectDetailView'

export const usePublicProjectDetailUseCase = (slug: string) => {
  const query = usePublicProjectBySlugQuery(slug)

  const projectView = computed(() => {
    return useProjectDetailView(query.data.value)
  })

  return {
    ...query,
    data: projectView,
  }
}
