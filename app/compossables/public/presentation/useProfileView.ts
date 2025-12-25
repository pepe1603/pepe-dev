import type { PublicProfileQuery } from '~/types/queries'

export const useProfileView = (profile: PublicProfileQuery | null) => {
  if (!profile) return null

  return {
    id: profile.id,
    name: profile.full_name,
    headline: profile.headline ?? '',
    bio: profile.bio ?? '',
    avatar: profile.avatar_url ?? '/avatar-placeholder.png',
    links: {
      github: profile.github_url,
      linkedin: profile.linkedin_url,
      twitter: profile.twitter_url,
      website: profile.website_url,
    },
    hasSocials:
      !!profile.github_url ||
      !!profile.linkedin_url ||
      !!profile.twitter_url ||
      !!profile.website_url,
  }
}
