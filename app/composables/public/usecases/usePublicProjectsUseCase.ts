// app/composables/public/usecases/usePublicProjectsUseCase.ts
import { usePublicProjectsQuery } from '../queries/usePublicProjectsQuery'
import { useProjectsView } from '../views/useProjectsView'

export const usePublicProjectsCase = () => {
  const query = usePublicProjectsQuery()

  const projectsView = computed(() => {
    return useProjectsView(query.data.value ?? [])
  })

  return {
    ...query,
    data: projectsView,
  }
}
