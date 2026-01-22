// app/composables/public/queries/usePublicTechnologiesQuery.ts
import { usePublicTechnologies } from '../data/usePublicTechnologies'

export const usePublicTechnologiesQuery = () => {
  const { fetchTechnologies } = usePublicTechnologies()

  return useAsyncData(
    'public-technologies',
    async () => await fetchTechnologies(),
    {
      server: true,
      lazy: false,
      default: () => []
    }
  )
}
