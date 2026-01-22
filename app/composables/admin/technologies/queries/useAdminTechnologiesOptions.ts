// app/composables/admin/technologies/queries/useAdminTechnologiesOptions.ts
import { ref, onMounted } from 'vue'
import { useSupabaseClient } from '#imports'

type TechnologyOption = {
  id: string
  name: string
}

export const useAdminTechnologiesOptions = () => {
  const supabase = useSupabaseClient()

  const technologies = ref<TechnologyOption[]>([])
  const loading = ref(false)

  const fetch = async () => {
    loading.value = true

    const { data } = await supabase
      .from('technologies')
      .select('id, name')
      .returns<TechnologyOption[]>()
      .order('name')

    technologies.value = data ?? []
    loading.value = false
  }

  onMounted(fetch)

  return {
    technologies,
    loading,
  }
}
