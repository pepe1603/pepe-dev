import type { PublicSkillItem } from '~/types/queries'

export const usePublicSkills = () => {
  const { client } = useSupabase()

  const fetchSkills = async (): Promise<PublicSkillItem[]> => {
    const { data, error } = await client
      .from('skills_public')
      .select(`
        id,
        name,
        level,
        category,
        display_order
      `)
      .order('display_order')

    if (error) {
      console.error('[Skills]', error)
      return []
    }

    return data
  }

  return { fetchSkills }
}
