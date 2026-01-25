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
  levelColor: BadgeColor
}

export interface SkillCategoryView {
  category: string
  skills: SkillViewModel[]
}

const DEFAULT_LEVEL: SkillLevel = 'basic'

export const useSkillsView = (
  skills: PublicSkillItem[]
): SkillCategoryView[] => {
  const getLevelColor = (level: SkillLevel): BadgeColor => {
    const colors: Record<SkillLevel, BadgeColor> = {
      basic: 'neutral',
      intermediate: 'info',
      advanced: 'success',
      expert: 'primary',
    }
    return colors[level]
  }

  // 🔹 Normalizamos id, name y level
  const mapped: SkillViewModel[] = skills
    .filter(skill => skill.id && skill.name) // eliminamos nulos
    .map(skill => {
      const rawCategory = skill.category?.trim() || 'Uncategorized'
      const level: SkillLevel = skill.level ?? DEFAULT_LEVEL

      return {
        id: skill.id!,
        name: skill.name!,
        level,
        category: rawCategory,
        levelColor: getLevelColor(level),
      }
    })

  // 🔹 Agrupamos por categoría
  const grouped = mapped.reduce<Record<string, SkillViewModel[]>>(
    (acc, skill) => {
      acc[skill.category] ??= []       // inicializa si es undefined
      acc[skill.category]!.push(skill) // ahora TS sabe que no es undefined
      return acc
    },
    {}
  )


  return Object.entries(grouped).map(([category, skills]) => ({
    category,
    skills,
  }))
}

