// app/composables/auth/data/useAuthLogin.ts
import { useSupabase } from '~/composables/useSupabase'

export interface AuthLoginPayload {
  email: string
  password: string
}

export const useAuthLogin = () => {
  const { auth } = useSupabase()

  const login = async ({ email, password }: AuthLoginPayload) => {
    const { data, error } = await auth.signInWithPassword({
      email,
      password,
    })

    return { data, error }
  }

  return { login }
}

