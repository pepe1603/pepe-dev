//app/composables/ussecases/usePublicProfileCases.ts
import { usePublicProfileQuery } from '../queries/usePublicProfileQuery'
import { useProfileView } from '../views/useProfileView'

export const usePublicProfileCase = () => {
  const query = usePublicProfileQuery()

  const profileView = computed(() => {
    return useProfileView(query.data.value)
  })

  return {
    ...query,
    data: profileView
  }
}
