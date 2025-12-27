// app/composables/useSupabase.ts
import type { Database } from '~/types'

/**
 * Composables base para Supabase con tipado completo
 */
export const useSupabase = () => {
  const client = useSupabaseClient<Database>()
  const user = useSupabaseUser()
  
  // Verificar si el usuario es admin
  const isAdmin = computed(() => {
    if (!user.value) return false
    const role = user.value.user_metadata?.role
    return role === 'admin'
  })
  
  // Obtener usuario actual con metadata
  const currentUser = computed(() => {
    if (!user.value) return null
    
    return {
      id: user.value.id,
      email: user.value.email,
      metadata: user.value.user_metadata,
      isAdmin: user.value.user_metadata?.role === 'admin'
    }
  })

  return {
    client,
    user,
    currentUser,
    isAdmin,
    // Métodos de conveniencia
    from: client.from.bind(client),
    storage: client.storage,
    auth: client.auth
  }
}