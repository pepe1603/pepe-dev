// app/composables/auth/usecases/useAuthResetPassword.ts
import { ref } from 'vue'
import { useSupabase } from '~/composables/useSupabase'

export function useAuthResetPassword() {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref<string | null>(null)

  const { auth } = useSupabase()
  const router = useRouter()
  const toast = useToast()

  /**
   * Envía el email de recuperación
   * ✅ El redirectTo apunta a /auth/confirm que manejará el code
   */
  const sendResetEmail = async (email: string) => {
    loading.value = true
    error.value = null
    success.value = null

    try {
      const { error: supabaseError } = await auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/confirm?type=recovery`,
      })

      if (supabaseError) throw supabaseError

      success.value = 'Se envió un enlace de recuperación a tu correo.'
      toast.add({
        title: 'Correo enviado',
        description: success.value,
        icon: 'i-lucide-mail',
        color: 'success',
      })
    } catch (e: any) {
      error.value = e.message || 'Error al enviar el enlace.'
      toast.add({
        title: 'Error',
        description: error.value,
        icon: 'i-lucide-alert-circle',
        color: 'error',
      })
    } finally {
      loading.value = false
    }
  }

  /**
   * Actualiza la contraseña del usuario autenticado
   * ✅ Se debe llamar DESPUÉS de que /auth/confirm haya validado el code
   */
  const resetPassword = async (password: string) => {
    loading.value = true
    error.value = null

    try {
      const { error: updateError } = await auth.updateUser({ password })

      if (updateError) throw updateError

      success.value = 'Contraseña actualizada correctamente.'
      toast.add({
        title: 'Éxito',
        description: success.value,
        icon: 'i-lucide-check-circle',
        color: 'success',
      })

      setTimeout(() => {
        router.push({ name: 'auth-login' })
      }, 2000)
    } catch (e: any) {
      error.value = e.message || 'Error al actualizar la contraseña.'
      toast.add({
        title: 'Error',
        description: error.value,
        icon: 'i-lucide-alert-circle',
        color: 'error',
      })
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    success,
    sendResetEmail,
    resetPassword,
  }
}
