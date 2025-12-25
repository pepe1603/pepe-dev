//app/types/domain.ts
import type {
  Tables,
  TablesInsert,
  TablesUpdate,
  Enums
} from './supabase'

/* =========================
   PROFILES
========================= */
export type Profile = Tables<'profiles'>
export type PublicProfile = Tables<'profiles_public'>
export type ProfileInsert = TablesInsert<'profiles'>
export type ProfileUpdate = TablesUpdate<'profiles'>

/* =========================
   PROJECTS
========================= */
export type Project = Tables<'projects'>
export type PublicProject = Tables<'projects_public'>
export type ProjectInsert = TablesInsert<'projects'>
export type ProjectUpdate = TablesUpdate<'projects'>

/* =========================
   EXPERIENCES
========================= */
export type Experience = Tables<'experiences'>
export type PublicExperience = Tables<'experiences_public'>
export type ExperienceInsert = TablesInsert<'experiences'>
export type ExperienceUpdate = TablesUpdate<'experiences'>

/* =========================
   SKILLS
========================= */
export type Skill = Tables<'skills'>
export type PublicSkill = Tables<'skills_public'>
export type SkillInsert = TablesInsert<'skills'>
export type SkillUpdate = TablesUpdate<'skills'>

/* =========================
   TECHNOLOGIES
========================= */
export type Technology = Tables<'technologies'>
export type TechnologyInsert = TablesInsert<'technologies'>
export type TechnologyUpdate = TablesUpdate<'technologies'>

/* =========================
   MEDIA
========================= */
export type Media = Tables<'media'>
export type MediaInsert = TablesInsert<'media'>
export type MediaUpdate = TablesUpdate<'media'>

/* =========================
   ENUMS (reexport semántico)
========================= */
export type RecordStatus = Enums<'record_status'>
export type ExperienceType = Enums<'experience_type'>
export type SkillLevel = Enums<'skill_level'>
