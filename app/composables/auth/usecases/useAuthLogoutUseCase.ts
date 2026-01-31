// app/composables/auth/usecases/useAuthLogoutUseCase.ts
export const useAuthLogoutUseCase = () => {
  const supabase = useSupabaseClient()
  const router = useRouter()
  const toast = useToast()

  const loadingLogout = ref(false)

  const logout = async () => {
    loadingLogout.value = true
    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        toast.add({
          title: 'Error al cerrar sesión',
          description: error.message,
          icon: 'i-lucide-alert-circle',
          color: 'error',
        })
        return
      }

      toast.add({
        title: 'Sesión cerrada',
        description: 'Has cerrado sesión correctamente.',
        icon: 'i-lucide-check-circle',
        color: 'success',
      })

      await router.push({ name: 'auth-login' })
    } catch (error) {
      console.error('Error en logout:', error)
      toast.add({
        title: 'Error inesperado',
        description: 'Ocurrió un error al cerrar sesión.',
        icon: 'i-lucide-alert-circle',
        color: 'error',
      })
    } finally {
      loadingLogout.value = false
    }
  }

  return {
    logout,
    loadingLogout,
  }
}
