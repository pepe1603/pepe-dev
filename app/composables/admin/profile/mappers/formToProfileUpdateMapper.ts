//app/composables/admin/profile/mappers/formToProfileUpdateMapper.ts
import type { TablesUpdate } from '~/types/database.types'
import type { ProfileFormModel } from '../models/ProfileFormModel'

type ProfileUpdate = TablesUpdate<'profiles'>

export const formToProfileUpdateMapper = (
  form: ProfileFormModel
): ProfileUpdate => {
  return {
    full_name: form.fullName,
    headline: form.headline,
    bio: form.bio,
    location: form.location,
    email_public: form.emailPublic,

    github_url: form.socials.github,
    linkedin_url: form.socials.linkedin,
    twitter_url: form.socials.twitter,
    website_url: form.socials.website,

    avatar_url: form.avatarUrl,
    cv_url: form.cvUrl,

    updated_at: new Date().toISOString(),
  }
}
