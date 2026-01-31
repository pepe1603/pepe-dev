// app/plugins/admin-command.client.ts
import { useSupabase } from '~/composables/useSupabase'

export default defineNuxtPlugin(() => {
  const toast = useToast()
  const { isAuthenticated, isAdmin } = useSupabase()

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault()

      if (isAuthenticated.value) {
        if (isAdmin.value) {
          // Usuario autenticado y admin → dashboard
          navigateTo('/admin')
          toast.add({
            title: '¡Bienvenido de nuevo, admin!',
            description: '🚀 Redirigiéndote al panel de administración…',
            icon: 'i-lucide-award',
            color: 'success',
            duration: 5000,
            close: true,
            //onClose: () => console.log('Toast cerrado'),
          })
        } else {
          // Usuario autenticado pero NO admin → acceso restringido
          toast.add({
            title: 'Acceso restringido',
            description: '⚠️ Tu cuenta no tiene permisos para acceder al panel.',
            icon: 'i-lucide-lock',
            color: 'warning',
            duration: 7000,
            close: true,
          })
        }
      } else {
        // Usuario NO autenticado → login
        navigateTo('/auth/login')
        toast.add({
          title: 'Acceso requerido',
          description: '🔑 Debes iniciar sesión para acceder al panel administrativo.',
          icon: 'i-lucide-lock',
          color: 'primary',
          duration: 7000,
          close: true,
        })
      }
    }
  })
})
