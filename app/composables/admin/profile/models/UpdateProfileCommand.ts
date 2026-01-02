//app/composables/admin/profile/models/UpdateProfileCommand.ts
/**
 * Command usado para persistir cambios del perfil en Supabase
 * Representa exactamente lo que la DB espera
 */
export interface UpdateProfileCommand {
  full_name: string

  headline?: string | null
  bio?: string | null
  location?: string | null
  email_public?: string | null

  avatar_url?: string | null
  cv_url?: string | null

  github_url?: string | null
  linkedin_url?: string | null
  twitter_url?: string | null
  website_url?: string | null
}
