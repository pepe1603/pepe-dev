// app/composables/public/queries/usePublicExperienceByIdQuery.ts
import { usePublicExperiencesQuery } from './usePublicExperiencesQuery'

export const usePublicExperienceByIdQuery = (id: string) => {
  const query = usePublicExperiencesQuery()

  const experience = computed(() => {
    if (!query.data.value) return null
    return query.data.value.find(exp => exp.id === id) ?? null
  })

  return {
    ...query,
    data: experience,
  }
}
