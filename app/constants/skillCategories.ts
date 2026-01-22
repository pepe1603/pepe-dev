//app/constants/skillsCategories.ts
/**
 * Skill categories used by the UI (public + admin).
 * These are NOT DB enums.
 */
/**
 * Categorías oficiales usadas por la UI.
 * NO son enums de DB.
 */

/**
 * Skill category suggestions used by the UI.
 * NOT DB enums.
 * User can add custom categories.
 */
export const SKILL_CATEGORY_SUGGESTIONS = [
  'DevOps',
  'Mobile',
  'Database',
  'Testing',
  'Tools',
  'Soft Skills',
  'Architecture',      // Arquitectura de sistemas
  'Frontend Domain',   // No es solo JS, es accesibilidad, performance, etc.
  'Backend Domain',    // Seguridad, concurrencia, APIs.
  'Infrastructure',    // Nube, Redes.
  'Testing & Quality', // QA, TDD, BDD.
  'Leadership',        // Mentoring, gestión de equipos.
  'Product Design',    // UX/UI, Prototipado.
  'Methodologies',     // Agile, Lean, Scrum.
] as const

export type SkillCategorySuggestion =
  typeof SKILL_CATEGORY_SUGGESTIONS[number]
