import { usePublicProfile } from '../data/usePublicProfile'

export const usePublicProfileQuery = () => {
  return useAsyncData(
    'public-profile',
    async () => {
      const { fetchProfile } = usePublicProfile()
      return fetchProfile()
    },
    {
      server: true,
      lazy: false,
      default: () => null,
    }
  )
}
