//app/composables/admin/projects/queries/useAdminProjectsMutations
import type { Ref } from 'vue'
import type { Tables } from '~/types/database.types'
import { useSupabaseClient } from '#imports'

type ProjectRow = Tables<'projects'>

export const useAdminProjectsMutations = (projects: Ref<ProjectRow[]>) => {
  const supabase = useSupabaseClient()

  const toast = useToast()

  const softDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ deleted_at: new Date().toISOString(), status: 'trashed' })
        .eq('id', id)
      if (error) throw error

      const project = projects.value.find(p => p.id === id)
      if (project) {
        project.deleted_at = new Date().toISOString()
        project.status = 'trashed'
      }

      toast.add({
        description: 'Proyecto eliminado correctamente',
        icon: 'i-lucide-shield-check',
        color: 'success'
      })
    } catch (err: any) {
      console.error('Error soft deleting proyect:', err.message || err)
      toast.add({
        description:
          'Upps!, algo fallo, Error al eliminar proyecto',
        icon: 'i-lucide-shield-x',
        color: 'error',
      })
    }
  }

  const restore = async (id: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ deleted_at: null, status: 'draft' })
        .eq('id', id)
      if (error) throw error

      const project = projects.value.find(p => p.id === id)
      if (project) {
        project.deleted_at = null
        project.status = 'draft'
      }

      toast.add({
      title: 'Proyecto restaurado correctamente',
      icon: 'i-lucide-shield-check',
      color: 'success',
    })

    } catch (err: any) {
      console.error('Error restoring project:', err.message || err)
      toast.add({
        description:
          'Upps!, algo fallo, Error al restaurar el proyecto',
        icon: 'i-lucide-shield-x',
        color: 'error',
      })
    }
  }

  const archive = async (id: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ status: 'archived' })
        .eq('id', id)
      if (error) throw error

      const project = projects.value.find(p => p.id === id)
      if (project) project.status = 'archived'

      toast.add({
      title: 'Proyecto archivado correctamente',
      icon: 'i-lucide-shield-check',
      color: 'success',
    })
    } catch (err: any) {
      console.error('Error archiving project:', err.message || err)
      toast.add({
        description:
          'Upps!, algo fallo, Error al archivar proyecto',
        icon: 'i-lucide-shield-x',
        color: 'error',
      })
    }
  }

  return { softDelete, restore, archive }
}
