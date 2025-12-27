import { usePublicSkillsQuery } from '../queries/usePublicSkillsQuery'
import { useSkillsView } from '../views/useSkillsView'

export const usePublicSkillsCase = () => {
  const query = usePublicSkillsQuery()

  const skillsView = computed(() => {
    return useSkillsView(query.data.value ?? [])
  })

  return {
    ...query,
    data: skillsView
  }
}
