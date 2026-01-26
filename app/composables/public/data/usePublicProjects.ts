//app/componsables/public/data/ussePublicProjects.ts
import type { PublicProjectListItem } from '~/types/queries'

type RawProject = {
  id: string | null
  title: string | null
  slug: string | null
  short_description: string | null
  thumbnail_url: string | null
  is_featured: boolean | null
  published_at: string | null
}

const isValidProject = (
  p: RawProject
): p is Required<Pick<RawProject, 'id' | 'title' | 'slug'>> & RawProject =>
  Boolean(p.id && p.title && p.slug)

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

    if (error || !data) return []

    return data
      .filter(isValidProject)
      .map(p => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        short_description: p.short_description,
        thumbnail_url: p.thumbnail_url,
        is_featured: p.is_featured ?? false,
        published_at: p.published_at,
      }))
  }

  return { fetchProjects }
}
