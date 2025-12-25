import { usePublicExperiences } from '../data/usePublicExperiences'

export const usePublicExperiencesQuery = () => {
  return useAsyncData(
    'public-experiences',
    async () => {
      const { fetchExperiences } = usePublicExperiences()
      return fetchExperiences()
    },
    {
      server: true,
      default: () => [],
    }
  )
}
