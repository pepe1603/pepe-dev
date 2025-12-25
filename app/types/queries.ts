import type {
  PublicProfile,
  PublicProject,
  PublicExperience,
  PublicSkill,
  Technology,
  Media,
} from './domain'

/* =========================
   PUBLIC QUERIES
========================= */

// Perfil público
export type PublicProfileQuery = Pick<
  PublicProfile,
  | 'id'
  | 'full_name'
  | 'headline'
  | 'bio'
  | 'avatar_url'
  | 'github_url'
  | 'linkedin_url'
  | 'twitter_url'
  | 'website_url'
>

// Proyecto público (lista)
export type PublicProjectListItem = Pick<
  PublicProject,
  | 'id'
  | 'title'
  | 'slug'
  | 'short_description'
  | 'thumbnail_url'
  | 'is_featured'
  | 'published_at'
>

// Proyecto público (detalle)
export type PublicProjectDetail = PublicProjectListItem & {
  description: string | null
  demo_url: string | null
  repo_url: string | null
  tags: string[] | null
  technologies: Technology[]
  media: Media[]
}

// Skills
export type PublicSkillItem = Pick<
  PublicSkill,
  | 'id'
  | 'name'
  | 'level'
  | 'category'
  | 'display_order'
>

// Experiences
export type PublicExperienceItem = Pick<
  PublicExperience,
  | 'id'
  | 'title'
  | 'subtitle'
  | 'type'
  | 'start_date'
  | 'end_date'
  | 'location'
  | 'url'
>
