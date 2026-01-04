//app/composables/admin/profile/mappers/profileToFormMapper.ts
import type { Tables } from '~/types/database.types';
import type { ProfileFormModel } from '../models/ProfileFormModel'
 /** 
  * Mapper: ProfileEntity (DB / API) → ProfileFormModel (UI) 
  * * No muta * No side effects 
  * */
  export const profileToFormMapper = (profile: Tables<'profiles'> // luego tiparemos con ProfileEntity
  ): ProfileFormModel => {
    return {
      fullName: profile.full_name ?? "",
      headline: profile.headline ?? "",
      bio: profile.bio ?? "",
      location: profile.location ?? "",
      emailPublic: profile.email_public ?? "",
      avatarUrl: profile.avatar_url ?? null,
      avatarFile: null,
      cvUrl: profile.cv_url ?? null,
      cvFile: null,
      socials: {
        github: profile.github_url ?? "",
        linkedin: profile.linkedin_url ?? "",
        twitter: profile.twitter_url ?? "",
        website: profile.website_url ?? "",
      },
    };
  };