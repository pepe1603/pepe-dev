// types/supabase.ts
import type { Tables, Enums, Database } from './database.types';

// Exportamos el tipo principal de la base de datos para tipar el cliente
export type DB = Database;

// =============================================
// 1. TABLAS PRINCIPALES (Row Types)
// =============================================

// Perfiles
export type IProfile = Tables<'profiles'>;
export type IProfileInsert = TablesInsert<'profiles'>;
export type IProfileUpdate = TablesUpdate<'profiles'>;

// Habilidades
export type ISkill = Tables<'skills'>;
export type ISkillInsert = TablesInsert<'skills'>;
export type ISkillUpdate = TablesUpdate<'skills'>;

// Tecnologías
export type ITechnology = Tables<'technologies'>;
export type ITechnologyInsert = TablesInsert<'technologies'>;
export type ITechnologyUpdate = TablesUpdate<'technologies'>;

// Proyectos
export type IProject = Tables<'projects'>;
export type IProjectInsert = TablesInsert<'projects'>;
export type IProjectUpdate = TablesUpdate<'projects'>;

// Experiencias
export type IExperience = Tables<'experiences'>;
export type IExperienceInsert = TablesInsert<'experiences'>;
export type IExperienceUpdate = TablesUpdate<'experiences'>;

// Media
export type IMedia = Tables<'media'>;
export type IMediaInsert = TablesInsert<'media'>;
export type IMediaUpdate = TablesUpdate<'media'>;

// Relación Proyecto-Tecnología
export type IProjectTechnology = Tables<'project_technologies'>;
export type IProjectTechnologyInsert = TablesInsert<'project_technologies'>;
export type IProjectTechnologyUpdate = TablesUpdate<'project_technologies'>;

// Log de Auditoría
export type IAuditLog = Tables<'audit_log'>;
export type IAuditLogInsert = TablesInsert<'audit_log'>;
export type IAuditLogUpdate = TablesUpdate<'audit_log'>;

// =============================================
// 2. VISTAS PÚBLICAS
// =============================================

// Vistas públicas (solo datos publicados)
export type IProfilePublic = Tables<'profiles_public'>;
export type IProjectPublic = Tables<'projects_public'>;
export type IExperiencePublic = Tables<'experiences_public'>;
export type ISkillPublic = Tables<'skills_public'>;

// =============================================
// 3. ENUMS
// =============================================

export type RecordStatus = Enums<'record_status'>;
export type SkillLevel = Enums<'skill_level'>;
export type ExperienceType = Enums<'experience_type'>;

// Constantes de Enums (para uso en UI/validaciones)
export const RecordStatusValues = ['draft', 'published', 'archived', 'trashed'] as const;
export const SkillLevelValues = ['basic', 'intermediate', 'advanced', 'expert'] as const;
export const ExperienceTypeValues = ['work', 'education', 'certification', 'volunteer', 'talk', 'publication'] as const;

// =============================================
// 4. TIPOS COMPUESTOS/HELPERS
// =============================================

// Para relaciones extendidas (con joins)
export type IProjectWithRelations = IProject & {
  project_technologies?: Array<IProjectTechnology & { technology?: ITechnology }>;
  media?: IMedia[];
};

export type IExperienceWithRelations = IExperience & {
  related_project?: IProject;
};

// Para formularios/creación
export interface ProjectFormData {
  title: string;
  subtitle?: string;
  slug: string;
  short_description: string;
  description: string;
  tags: string[];
  technologies: string[]; // IDs de tecnologías
  demo_url?: string;
  repo_url?: string;
  is_featured: boolean;
  status: RecordStatus;
}

export interface ProfileFormData {
  full_name: string;
  headline?: string;
  bio?: string;
  location?: string;
  avatar_url?: string;
  cv_url?: string;
  github_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  website_url?: string;
  email_public?: string;
  status: RecordStatus;
}

// =============================================
// 5. RESPONSE TYPES (para API/respuestas)
// =============================================

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

// =============================================
// 6. FILTER TYPES (para búsquedas/filtros)
// =============================================

export interface ProjectFilters {
  status?: RecordStatus;
  is_featured?: boolean;
  tags?: string[];
  technologies?: string[];
  search?: string;
  page?: number;
  perPage?: number;
}

export interface ExperienceFilters {
  type?: ExperienceType;
  status?: RecordStatus;
  search?: string;
}

// =============================================
// 7. STORAGE TYPES
// =============================================

export type StorageBucket = 'avatars' | 'project-thumbnails' | 'project-media';

export interface UploadFileOptions {
  bucket: StorageBucket;
  path: string;
  file: File;
  metadata?: Record<string, any>;
}

// =============================================
// 8. AUTH TYPES (extendiendo Supabase Auth)
// =============================================

export interface UserMetadata {
  role?: 'admin' | 'user';
  avatar_url?: string;
  full_name?: string;
}

export type AuthUser = {
  id: string;
  email: string;
  user_metadata: UserMetadata;
  role?: string;
};

// =============================================
// 9. EXPORTACIONES PRINCIPALES
// =============================================

// Re-exportar tipos útiles de database.types
export type { Tables, TablesInsert, TablesUpdate, Enums } from './database.types';