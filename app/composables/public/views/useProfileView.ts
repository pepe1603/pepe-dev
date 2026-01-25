// app/composables/public/presentation/useProfileView.ts
import type { PublicProfileQuery } from '~/types/queries'

export interface ProfileLinkView {
  type: 'github' | 'linkedin' | 'twitter' | 'website'
  url: string
  icon: string
}

export const useProfileView = (profile: PublicProfileQuery | null) => {
  if (!profile) return null

  const links: ProfileLinkView[] = []

  if (profile.github_url) {
    links.push({
      type: 'github',
      url: profile.github_url,
      icon: 'i-lucide-github'
    })
  }

  if (profile.linkedin_url) {
    links.push({
      type: 'linkedin',
      url: profile.linkedin_url,
      icon: 'i-lucide-linkedin'
    })
  }

  if (profile.twitter_url) {
    links.push({
      type: 'twitter',
      url: profile.twitter_url,
      icon: 'i-lucide-twitter'
    })
  }

  if (profile.website_url) {
    links.push({
      type: 'website',
      url: profile.website_url,
      icon: 'i-lucide-globe'
    })
  }

  return {
    id: profile.id,
    name: profile.full_name ?? '',
    headline: profile.headline ?? '',
    bio: profile.bio ?? '',
    avatar: profile.avatar_url ?? '/avatar-placeholder.png',
    location: profile.location ?? 'No especificado',
    email: profile.email_public ?? 'No disponible',
    cvUrl: profile.cv_url ?? null,
    links,
    hasSocials: links.length > 0
  }
}
