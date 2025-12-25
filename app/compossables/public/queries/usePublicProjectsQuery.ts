import { usePublicProjects } from '../data/usePublicProjects'

export const usePublicProjectsQuery = () => {
  return useAsyncData(
    'public-projects',
    async () => {
      const { fetchProjects } = usePublicProjects()
      return fetchProjects()
    },
    {
      server: true,
      default: () => [],
    }
  )
}
