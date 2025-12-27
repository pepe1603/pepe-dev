//app/componsables/public/queries/usePublicProjectsBySlugQuery.ts
import { usePublicProjectBySlug } from '../data/usePublicProjectBySlug'

export const usePublicProjectBySlugQuery = (slug: string) => {
  return useAsyncData(
    `public-project-${slug}`,
    async () => {
      const { fetchBySlug } = usePublicProjectBySlug()
      return fetchBySlug(slug)
    },
    {
      server: true,
      watch: [() => slug],
      default: () => null,
    }
  )
}
