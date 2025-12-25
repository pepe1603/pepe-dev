import type { PublicProfileQuery } from '~/types/queries'

export const usePublicProfile = () => {
  const { client } = useSupabase()

  const fetchProfile = async (): Promise<PublicProfileQuery | null> => {
    const { data, error } = await client
      .from('profiles_public')
      .select(`
        id,
        full_name,
        headline,
        bio,
        avatar_url,
        github_url,
        linkedin_url,
        twitter_url,
        website_url
      `)
      .single()

    if (error) {
      console.error('[Profile]', error)
      return null
    }

    return data
  }

  return { fetchProfile }
}
