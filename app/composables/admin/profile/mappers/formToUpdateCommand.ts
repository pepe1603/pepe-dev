//app/composables/admin/profile/mappers/formToUpdateCommand.ts
import type { ProfileFormModel } from '../models/ProfileFormModel'
import type { UpdateProfileCommand } from '../models/UpdateProfileCommand'

/**
 * Mapper: ProfileFormModel (UI) → UpdateProfileCommand (DB)
 * No valida
 * No sube archivos
 * Solo transforma
 */
export const formToUpdateCommand = (
  form: ProfileFormModel
): UpdateProfileCommand => {
  return {
    full_name: form.fullName.trim(),

    headline: form.headline || null,
    bio: form.bio || null,
    location: form.location || null,
    email_public: form.emailPublic || null,

    avatar_url: form.avatarUrl,
    cv_url: form.cvUrl,

    github_url: form.socials.github || null,
    linkedin_url: form.socials.linkedin || null,
    twitter_url: form.socials.twitter || null,
    website_url: form.socials.website || null,
  }
}
