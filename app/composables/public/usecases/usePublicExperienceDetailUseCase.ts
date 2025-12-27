// app/composables/public/usecases/usePublicExperienceDetailUseCase.ts
import { usePublicExperienceByIdQuery } from '../queries/usePublicExperienceByIdQuery'
import { useExperienceDetailView } from '../views/useExperienceDetailView'

export const usePublicExperienceDetailUseCase = (id: string) => {
  const query = usePublicExperienceByIdQuery(id)

  const experienceDetail = computed(() => {
    return useExperienceDetailView(query.data.value)
  })

  return {
    ...query,
    data: experienceDetail,
  }
}
