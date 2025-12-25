import type { Database } from '~/types'

export const useTypedSupabase = () => {
  return useSupabaseClient<Database>()
}
