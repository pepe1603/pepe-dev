import { useAuthLoginQuery } from '~/composables/auth/queries/useAuthLoginQuery'

export const useAuthLoginUseCase = () => {
  const { login: loginQuery, pending, error } = useAuthLoginQuery()

  const login = async (payload: { email: string; password: string }) => {
    const result = await loginQuery(payload)

    if (!result.error) {
      //await navigateTo('/admin', { replace: true }) //elimanr 

    }

    return result
  }

  return {
    login,
    loading: pending,
    error,
  }
}

