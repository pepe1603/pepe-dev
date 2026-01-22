// app/composables/public/presentation/useSkillsView.ts
import type { PublicSkillItem, SkillLevel } from '~/types/queries'

export type BadgeColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'neutral'

export interface SkillViewModel {
  id: string
  name: string
  level: SkillLevel
  category: string
  displayOrder: number
  levelColor: BadgeColor
}

export interface SkillCategoryView {
  category: string
  skills: SkillViewModel[]
}

export const useSkillsView = (
  skills: PublicSkillItem[]
): SkillCategoryView[] => {
  const getLevelColor = (level: SkillLevel): BadgeColor => {
    const colors: Record<SkillLevel, BadgeColor> = {
      basic: 'neutral',
      intermediate: 'info',
      advanced: 'success',
      expert: 'primary'
    }
    return colors[level]
  }

  const mapped: SkillViewModel[] = skills.map(skill => {
    const rawCategory = skill.category?.trim() || 'Uncategorized'

    return {
      id: skill.id,
      name: skill.name,
      level: skill.level,
      category: rawCategory,
      displayOrder: skill.display_order,
      levelColor: getLevelColor(skill.level)
    }
  })

  const grouped = mapped.reduce<Record<string, SkillViewModel[]>>(
    (acc, skill) => {
      const category = skill.category
      acc[category] ??= []
      acc[category].push(skill)
      return acc
    },
    {}
  )

  return Object.entries(grouped).map(([category, skills]) => ({
    category,
    skills
  }))
}
