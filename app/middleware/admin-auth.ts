// app/middleware/admin-auth.ts
export default defineNuxtRouteMiddleware((to) => {
  // Solo proteger rutas /admin
  if (!to.path.startsWith('/admin')) return

  const { isAuthenticated, user } = useSupabase()

  // SSR: esperar a que Supabase resuelva el estado
  if (import.meta.server && user.value === undefined) {
    return
  }

  // No autenticado → login
  if (!isAuthenticated.value) {
    return navigateTo({
      name: 'auth-login',
      query: { redirect: to.fullPath }
    })
  }
})
