// app/types/queries.ts
import type {
  PublicProfile,
  PublicProject,
  PublicExperience,
  PublicSkill,
  Technology,
  Media,
  SkillLevel,
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
  media: PublicMediaItem[]
}


export type PublicMediaItem = {
  id: string
  name: string
  type: string
  url: string
  alt: string | null
  caption: string | null
  sort_order: number
}


// Skills
export type PublicSkillItem = {
  id: string
  name: string
  level: SkillLevel
  category: string | null
  display_order: number
}

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
  | 'project_id'
  | 'project_title'
  | 'project_slug'
  | 'project_thumbnail_url'
>
// Technologies (public)
export type PublicTechnologyItem = {
  id: string
  name: string
  icon: string | null
  color: string | null
  website_url: string | null
  description: string | null
}



// Re-exportar enums
export type { SkillLevel } from './domain'