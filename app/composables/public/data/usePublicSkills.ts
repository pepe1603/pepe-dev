// app/composables/public/data/usePublicSkills.ts
import { useSupabase } from '~/composables/useSupabase'
import type { PublicSkillItem } from '~/types/queries'
import type { SkillLevel } from '~/types/domain'

const DEFAULT_LEVEL: SkillLevel = 'basic'

export const usePublicSkills = () => {
  const { client } = useSupabase()

  const fetchSkills = async (): Promise<PublicSkillItem[]> => {
    const { data, error } = await client
      .from('skills_public')
      .select(`
        id,
        name,
        level,
        category
      `)
      .order('name', { ascending: true })

    if (error || !data) {
      console.error('[Skills]', error)
      return []
    }

    console.log('dataskill public: ', data)
    // ✅ NORMALIZACIÓN (clave)
    return data
      .filter(skill => skill.id && skill.name)
      .map(skill => ({
        id: skill.id!,
        name: skill.name!,
        level: skill.level ?? DEFAULT_LEVEL,
        category: skill.category
      }))
  }

  return { fetchSkills }
}
