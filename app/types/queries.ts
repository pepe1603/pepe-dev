// app/types/queries.ts
import type {
  PublicProfile,
  PublicProject,
  PublicExperience,
  PublicSkill,
  Technology,
  Media,
  SkillLevel,
  ExperienceType,
} from './domain'

/* =========================
   PUBLIC QUERIES
========================= */

// Perfil público
export type PublicProfileQuery = {
          avatar_url: string | null
          bio: string | null
          email_public: string | null
          full_name: string | null
          github_url: string | null
          headline: string | null
          id: string | null
          linkedin_url: string | null
          location: string | null
          cv_url: string | null
          twitter_url: string | null
          website_url: string | null
}

// Proyecto público (lista)
export type PublicProjectListItem = {
  id: string | null
  title: string | null
  slug: string | null
  short_description: string | null
  thumbnail_url: string | null
  is_featured: boolean | null
  published_at: string | null
}


// Proyecto público (detalle)
export type PublicProjectDetail = PublicProjectListItem & {
  description: string | null
  demo_url: string | null
  repo_url: string | null
  tags: string[] | null

  technologies: Technology[] | null
  media: PublicMediaItem[] | null
}



export type PublicMediaItem = {
  id: string
  name: string
  url: string
  alt: string | null
  caption: string | null
  sort_order: number | null
}


// Skills
export type PublicSkillItem = {
  id: string | null
  name: string | null
  level: SkillLevel | null
  category: string | null
}


// Experiences
export type PublicExperienceItem = {
  id: string | null
  title: string | null
  subtitle: string | null
  type: ExperienceType | null
  start_date: string | null
  end_date: string | null
  location: string | null
  url: string | null
  project_id: string | null
  project_title: string | null
  project_slug: string | null
  project_thumbnail_url: string | null
}


// Technologies (public)
export type PublicTechnologyItem = {
  id: string
  name: string
  icon: string | null
  color: string | null
  website_url: string | null
  description: string | null
  sort_order: number | null
}

// Re-exportar enums
export type { SkillLevel } from './domain'