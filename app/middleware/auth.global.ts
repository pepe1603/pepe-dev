// app/middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  // 🔒 Rutas protegidas: requieren autenticación
  if (!user.value && to.path.startsWith('/admin')) {
    return navigateTo('/auth/login', { redirectCode: 303 })
  }

  // ✅ NUEVO: Safety net - Si usuario autenticado está en login, redirige INMEDIATAMENTE
  if (user.value && to.path === '/auth/login') {
    return navigateTo('/admin', { redirectCode: 303, replace: true })
  }

  // ✅ Rutas de auth públicas (permitidas aunque esté autenticado)
  const publicAuthRoutes = [
    '/auth/login',
    '/auth/confirm',
    '/auth/reset-password',
    '/auth/forgot-password',
  ]

  // 🚫 Si está autenticado y va a login/register, redirige a admin
  if (
    user.value &&
    to.path.startsWith('/auth') &&
    !publicAuthRoutes.includes(to.path)
  ) {
    return navigateTo('/admin', { redirectCode: 303, replace: true })
  }
})