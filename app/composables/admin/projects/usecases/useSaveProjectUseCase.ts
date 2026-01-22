// app/composables/admin/projects/usecases/useSaveProjectUseCase.ts
import { ref } from 'vue'
import { useSupabaseClient } from '#imports'

import type { ProjectFormModel } from '../models/ProjectFormModel'
import { formToProjectUpdateMapper } from '../mappers/formToProjectUpdateMapper'
import { formToProjectInsertMapper } from '../mappers/formToProjectInsertMapper'
import { useSyncProjectTechnologiesUseCase } from './useSyncProjectTechnologiesUseCase'


export const useSaveProjectUseCase = () => {
  const supabase = useSupabaseClient()


  const { sync } = useSyncProjectTechnologiesUseCase()


  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

const save = async (form: ProjectFormModel) => {
  loading.value = true
  error.value = null
  success.value = false

  let projectId = form.id

  if (form.id) {
    await supabase
      .from('projects')
      .update(formToProjectUpdateMapper(form))
      .eq('id', form.id)
  } else {
    const { data } = await supabase
      .from('projects')
      .insert(formToProjectInsertMapper(form))
      .select('id')
      .single()

    projectId = data?.id
  }

  if (!projectId) return

  if (form.technologyIds !== undefined) {
    await sync(projectId, form.technologyIds)
  }


  success.value = true
  loading.value = false
}

  

  return {
    save,
    loading,
    error,
    success,
  }
}
