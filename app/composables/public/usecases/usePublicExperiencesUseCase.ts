//app/composables/public/usecases/usePublicExperiencesUseCase.ts
import { usePublicExperiencesQuery } from '../queries/usePublicExperiencesQuery'
import { useExperiencesListView } from '../views/useExperiencesListView'

export const usePublicExperiencesUseCase = () => {
  const query = usePublicExperiencesQuery()

  const experiencesList = computed(() => {
    return useExperiencesListView(query.data.value ?? [])
  })

  return {
    ...query,
    data: experiencesList,
  }
}

