import type { Database } from '~/types'

export const useSupabase = () => {
  const client = useSupabaseClient<Database>()
  const user = useSupabaseUser()

  const isAuthenticated = computed<boolean>(() => Boolean(user.value))

  const isAdmin = computed(() => {
    if (!user.value) return false
    return user.value.user_metadata?.role === 'admin'
  })

  const currentUser = computed(() => {
    if (!user.value) return null

    return {
      id: user.value.id,
      email: user.value.email,
      metadata: user.value.user_metadata,
      isAdmin: isAdmin.value,
    }
  })

  return {
    client,
    auth: client.auth,
    user,
    currentUser,
    isAuthenticated,
    isAdmin,
  }
}
