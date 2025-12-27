// app/composables/public/queries/usePublicProjectsQuery.ts
import { usePublicProjects } from '../data/usePublicProjects'

export const usePublicProjectsQuery = () => {
  const { fetchProjects } = usePublicProjects()
  
  return useAsyncData(
    'public-projects',
    async () => {
      return await fetchProjects()
    },
    {
      server: true,
      lazy: false,
      default: () => [],
    }
  )
}