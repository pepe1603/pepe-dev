import { usePublicSkills } from '../data/usePublicSkills'

export const usePublicSkillsQuery = () => {
  return useAsyncData(
    'public-skills',
    async () => {
      const { fetchSkills } = usePublicSkills()
      return fetchSkills()
    },
    {
      server: true,
      default: () => [],
    }
  )
}
