// app/composables/admin/projects/usecases/useSyncProjectTechnologiesUseCase.ts
import { useSupabaseClient } from '#imports'

export const useSyncProjectTechnologiesUseCase = () => {
  const supabase = useSupabaseClient()

  const sync = async (
    projectId: string,
    technologyIds: string[] = []
  ) => {

    if (!Array.isArray(technologyIds)) return
    
    // 1. Delete old relations
    await supabase
      .from('project_technologies')
      .delete()
      .eq('project_id', projectId)

    // 2. Insert new relations
    if (technologyIds.length === 0) return

    const rows = technologyIds.map((techId, index) => ({
      project_id: projectId,
      technology_id: techId,
      sort_order: index,
    }))

    await supabase
      .from('project_technologies')
      .insert(rows)
  }

  return { sync }
}
