import type { PublicSkillItem } from '~/types/queries'

export const useSkillsView = (skills: PublicSkillItem[]) => {
  const grouped = skills.reduce<Record<string, PublicSkillItem[]>>(
    (acc, skill) => {
      const category = skill.category ?? 'Other'
      acc[category] ||= []
      acc[category].push(skill)
      return acc
    },
    {}
  )

  return Object.entries(grouped).map(([category, items]) => ({
    category,
    skills: items.map(s => ({
      id: s.id,
      name: s.name,
      level: s.level,
    })),
  }))
}
