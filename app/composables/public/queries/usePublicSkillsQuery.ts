// app/composables/public/queries/usePublicSkillsQuery.ts
import { usePublicSkills } from '../data/usePublicSkills'

export const usePublicSkillsQuery = () => {
  const { fetchSkills } = usePublicSkills()
  
  return useAsyncData(
    'public-skills',
    async () => {
      return await fetchSkills()
    },
    {
      server: true,
      lazy: false,
      default: () => []
    }
  )
}