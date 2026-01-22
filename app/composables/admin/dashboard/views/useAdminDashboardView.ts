// app/composables/admin/dashboard/views/useAdminDashboardView.ts
import type { DashboardItem } from '~/types/queries.admin'

export type DashboardEntity = 'project' | 'skill' | 'experience'

export interface DashboardEntityView {
  entity: DashboardEntity
  label: string
  total: number
  published: number
  drafts: number
  lastDrafts: DashboardItem[]
}

const ENTITY_LABELS: Record<DashboardEntity, string> = {
  project: 'Proyectos',
  skill: 'Skills',
  experience: 'Experiencias',
}

export const useAdminDashboardView = (
  items: DashboardItem[] | null
): DashboardEntityView[] => {
  if (!items?.length) return []

  // 👇 inicializamos TODAS las entidades conocidas
  const grouped: Record<DashboardEntity, DashboardItem[]> = {
    project: [],
    skill: [],
    experience: [],
  }

  // 👇 filtramos y normalizamos
  for (const item of items) {
    if (!item.entity) continue
    if (item.entity in grouped) {
      grouped[item.entity as DashboardEntity].push(item)
    }
  }

  return (Object.keys(grouped) as DashboardEntity[]).map((entity) => {
    const entityItems = grouped[entity]

    const published = entityItems.filter(
      (i) => i.status === 'published'
    ).length

    const drafts = entityItems.filter(
      (i) => i.status === 'draft'
    ).length

    const lastDrafts = entityItems
      .filter((i) => i.status === 'draft')
      .sort(
        (a, b) =>
          new Date(b.created_at ?? 0).getTime() -
          new Date(a.created_at ?? 0).getTime()
      )
      .slice(0, 3)

    return {
      entity,
      label: ENTITY_LABELS[entity],
      total: entityItems.length,
      published,
      drafts,
      lastDrafts,
    }
  })
}

