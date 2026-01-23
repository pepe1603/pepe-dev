//app/componsables/public/data/ussePublicProjectsBySlug.ts
import type { PublicProjectDetail } from '~/types/queries'

export const usePublicProjectBySlug = () => {
  const { client } = useSupabase()

  const fetchBySlug = async (slug: string): Promise<PublicProjectDetail | null> => {
    const { data, error } = await client
      .from('projects_public')
      .select(`
        id,
        title,
        slug,
        short_description,
        description,
        thumbnail_url,
        demo_url,
        repo_url,
        tags,
        is_featured,
        published_at,
        technologies:project_technologies (
          technology:technologies (*)
        ),
        media (
          id,
          name,
          type,
          url,
          alt,
          caption,
          sort_order
        )
      `)
      .eq('slug', slug)
      .order('sort_order', { foreignTable: 'media', ascending: true })
      .single()

    if (error) {
      console.error('[Project slug]', error)
      return null
    }
    console.log('data prioject slug: ', data)

    return {
         ...data,
      technologies: data.technologies.map(t => t.technology),
    }
  }

  return { fetchBySlug }
}
