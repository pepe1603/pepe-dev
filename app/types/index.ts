// types/index.ts
// Re-exportar todo desde supabase.ts para importaciones más limpias
export * from './supabase';

// También exportar tipos base si se necesitan
export type { Database } from './database.types.ts';