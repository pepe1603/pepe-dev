// app/composables/admin/projects/queries/useAdminProjectsMutations.ts
import { useSupabaseClient } from '#imports'
import type { RecordStatus } from '~/types'
import type { Ref } from 'vue'
import type { ProjectFormModel } from '../models/ProjectFormModel'

export const useAdminProjectsMutations = (
  projects: Ref<ProjectFormModel[]>
) => {
  const supabase = useSupabaseClient()
  const toast = useToast()

  const updateStatus = async (
    id: string,
    status: RecordStatus,
    successMsg: string
  ) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update({ status })
        .eq('id', id)
        .select('id, status, updated_at')
        .single()

      if (error) throw error

      // ✅ Actualizamos el proyecto localmente
      const project = projects.value.find(p => p.id === id)
      if (project && data) {
        project.status = data.status
        project.updatedAt = data.updated_at
      }

      toast.add({
        title: successMsg,
        icon: 'i-lucide-shield-check',
        color: 'success',
      })
    } catch (err: any) {
      console.error(err)
      toast.add({
        description: 'Upps!, algo falló al actualizar el proyecto',
        icon: 'i-lucide-shield-x',
        color: 'error',
      })
    }
  }

  return {
    softDelete: (id: string) =>
      updateStatus(id, 'trashed', 'Proyecto eliminado correctamente'),
    restore: (id: string) =>
      updateStatus(id, 'draft', 'Proyecto restaurado correctamente'),
    archive: (id: string) =>
      updateStatus(id, 'archived', 'Proyecto archivado correctamente'),
  }
}
