// app/composables/public/queries/usePublicProfileQuery.ts
import { usePublicProfile } from '../data/usePublicProfile'

export const usePublicProfileQuery = () => {
  const { fetchProfile } = usePublicProfile()
  
  return useAsyncData(
    'public-profile',
    async () => {
      return await fetchProfile()
    },
    {
      server: true,
      lazy: false,
      default: () => null
    }
  )
}