//app/middleware/guest.ts
export default defineNuxtRouteMiddleware(() => {
  const user = useSupabaseUser()

  if (user.value) {
    console.log(`[GUEST GUARD] Usuario ya autenticado. Redirigiendo a Dashboard.`);
    
            // 3. Redirige a la página principal del dashboard
            // Usamos el nombre de la ruta para mayor robustez
            return navigateTo({ name: 'admin-dashboard' });
  }

  // Si el usuario no existe, se permite el acceso a la ruta (Login/Register).
})
