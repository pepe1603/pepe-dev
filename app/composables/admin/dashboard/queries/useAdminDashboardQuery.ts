///dashboard/queries/useAdminDashboardQuery.ts
import type { DashboardItem } from '~/types/queries.admin'

export const useAdminDashboardQuery = () => {
  const { client } = useSupabase()

  const fetchDashboardItems = async (): Promise<DashboardItem[]> => {
    const { data, error } = await client
      .from('dashboard_items')
      .select('*')
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('[Dashboard][Supabase error]', error)
      throw error
    }
    return data ?? []
  }

  const query = useAsyncData(
    'admin-dashboard-items',
    fetchDashboardItems,
    {
      server: true,
      default: () => [],
    }
  )

  return {
    data: query.data,
    pending: query.pending,
    error: query.error,
  }
}
