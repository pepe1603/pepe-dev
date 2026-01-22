// app/composables/public/data/usePublicTechnologies.ts
import { useSupabase } from '~/composables/useSupabase'
import type { PublicTechnologyItem } from '~/types/queries'

export const usePublicTechnologies = () => {
  const { client } = useSupabase()

  const fetchTechnologies = async (): Promise<PublicTechnologyItem[]> => {
    const { data, error } = await client
      .from('technologies')
      .select(`
        id,
        name,
        icon,
        color,
        website_url,
        description
      `)
      .eq('status', 'published')
      .order('name', { ascending: true })

    if (error || !data) {
      console.error('[Technologies]', error)
      return []
    }

    return data
      .filter(t => t.id && t.name)
      .map(t => ({
        id: t.id!,
        name: t.name!,
        icon: t.icon,
        color: t.color,
        website_url: t.website_url,
        description: t.description
      }))
  }

  return { fetchTechnologies }
}
