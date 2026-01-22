//app/componsables/public/data/ussePublicProjects.ts
import type { PublicProjectListItem } from '~/types/queries'

export const usePublicProjects = () => {
  const { client } = useSupabase()

  const fetchProjects = async (): Promise<PublicProjectListItem[]> => {
    const { data, error } = await client
      .from('projects_public')
      .select(`
        id,
        title,
        slug,
        short_description,
        thumbnail_url,
        is_featured,
        published_at
      `)
      .order('is_featured', { ascending: false })
      .order('published_at', { ascending: false })

    if (error) {
      console.error('[Projects]', error)
      return []
    }

    console.log('data projects public: ', data)

    return data
  }

  return { fetchProjects }
}
