// app/composables/auth/queries/useAuthLoginQuery.ts
import { ref } from 'vue'
import type { AuthLoginPayload } from '~/composables/auth/data/useAuthLogin'
import { useAuthLogin } from '~/composables/auth/data/useAuthLogin'

export const useAuthLoginQuery = () => {
  const { login: loginAction } = useAuthLogin()

  const pending = ref(false)
  const error = ref<Error | null>(null)
  const data = ref<unknown | null>(null)

  const login = async (payload: AuthLoginPayload) => {
    pending.value = true
    error.value = null

    const result = await loginAction(payload)

    if (result.error) {
      error.value = result.error
    } else {
      data.value = result.data
    }

    pending.value = false
    return result
  }

  return {
    login,
    pending,
    error,
    data,
  }
}

