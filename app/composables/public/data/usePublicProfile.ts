// app/composables/public/data/usePublicProfile.ts
import type { PublicProfileQuery } from '~/types/queries'

export const usePublicProfile = () => {
  const supabase = useSupabaseClient() // Usa useSupabaseClient directamente
  
  const fetchProfile = async (): Promise<PublicProfileQuery | null> => {
    try {
      const { data, error } = await supabase
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
    } catch (error) {
      console.error('[Profile] Error fetching:', error)
      return null
    }
  }

  return { fetchProfile }
}