//app/middleware/auth.ts
import { useSupabase } from '~/composables/useSupabase'

export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated, user  } = useSupabase()

    // Esperar a que Supabase cargue
  if (import.meta.server && user.value === undefined) {
    return
  }

  if (isAuthenticated.value && to.path.startsWith('/auth')) {
    return navigateTo('/')
  }
  //futuras rrutas protegidas
  if (!isAuthenticated.value && to.path.startsWith('/admin')) {
    return navigateTo('/auth/login')
  }
})
