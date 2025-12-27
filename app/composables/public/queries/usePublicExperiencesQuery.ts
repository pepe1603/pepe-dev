// app/composables/public/queries/usePublicExperiencesQuery.ts
import { usePublicExperiences } from '../data/usePublicExperiences'

export const usePublicExperiencesQuery = () => {
  const { fetchExperiences } = usePublicExperiences()
  
  return useAsyncData(
    'public-experiences',
    async () => {
      return await fetchExperiences()
    },
    {
      server: true,
      lazy: false,
      default: () => [],
    }
  )
}