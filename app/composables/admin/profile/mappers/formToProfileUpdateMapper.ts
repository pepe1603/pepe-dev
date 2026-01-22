//app/composables/admin/profile/mappers/formToProfileUpdateMapper.ts
import type { TablesUpdate } from '~/types/database.types'
import type { ProfileFormModel } from '../models/ProfileFormModel'

type ProfileUpdate = TablesUpdate<'profiles'>

export const formToProfileUpdateMapper = (
  form: ProfileFormModel
): ProfileUpdate => {
  return {
    full_name: form.fullName,
    headline: form.headline || null,
    bio: form.bio || null,
    location: form.location || null,
    email_public: form.emailPublic || null,

    github_url: form.socials.github || null,
    linkedin_url: form.socials.linkedin || null,
    twitter_url: form.socials.twitter || null,
    website_url: form.socials.website || null,

    avatar_url: form.avatarUrl || null,
    cv_url: form.cvUrl || null,

    // ❌ NADA DE updated_at AQUÍ
  }
}
