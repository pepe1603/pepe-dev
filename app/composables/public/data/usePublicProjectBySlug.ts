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
          url,
          alt,
          caption,
          sort_order
        )
      `)
      .eq('slug', slug)
      .order('sort_order', { referencedTable: 'media', ascending: true })
      .single()


    if (error || !data) {
      console.error('[Project slug]', error)
      return null
    }


    return {
      id: data.id,
      title: data.title,
      slug: data.slug!,
      short_description: data.short_description,
      description: data.description,
      thumbnail_url: data.thumbnail_url,
      demo_url: data.demo_url,
      repo_url: data.repo_url,
      tags: data.tags ?? [],
      is_featured: data.is_featured ?? false,
      published_at: data.published_at,

      technologies: (data.technologies ?? [])
        .map(t => t.technology)
        .filter(Boolean),

      media: data.media ?? [],
    }
  }

  return { fetchBySlug }
}
