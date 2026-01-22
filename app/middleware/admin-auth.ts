// app/middleware/admin-auth.ts
export default defineNuxtRouteMiddleware(() => {
  const user = useSupabaseUser()

  // ⚠️ IMPORTANTE: NO bloquear en SSR
  if (import.meta.server) return

  // Si NO hay sesión → login
  if (!user.value) {
    return navigateTo({name: 'auth-login'})
  }
})
