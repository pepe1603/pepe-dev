import type { PublicExperienceItem } from '~/types/queries'

export const usePublicExperiences = () => {
  const { client } = useSupabase()

  const fetchExperiences = async (): Promise<PublicExperienceItem[]> => {
    const { data, error } = await client
      .from('experiences_public')
      .select(`
        id,
        title,
        subtitle,
        type,
        start_date,
        end_date,
        location,
        url,

        project_id,
        project_title,
        project_slug,
        project_thumbnail_url
      `)
      .order('start_date', { ascending: false })

    if (error) {
      console.error('[Experiences]', error)
      return []
    }

    return data ?? []
  }

  return { fetchExperiences }
}
