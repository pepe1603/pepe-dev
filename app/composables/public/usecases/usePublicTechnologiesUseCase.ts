// app/composables/public/usecases/usePublicTechnologiesUseCase.ts
import { usePublicTechnologiesQuery } from '../queries/usePublicTechnologiesQuery'
import { useTechnologiesView } from '../views/useTechnologiesView'

export const usePublicTechnologiesCase = () => {
  const query = usePublicTechnologiesQuery()

  const technologiesView = computed(() => {
    return useTechnologiesView(query.data.value ?? [])
  })

  return {
    ...query,
    data: technologiesView
  }
}
