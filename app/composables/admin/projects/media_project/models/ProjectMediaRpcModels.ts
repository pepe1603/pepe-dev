// app/composables/admin/projects/media_project/models/ProjectMediaRpcModels.ts

export interface InsertProjectMediaArgs {
  projectId: string
  name: string
  url: string
  alt?: string | null
  caption?: string | null
}

export interface InsertProjectMediaResult {
  id: string
  project_id: string
  name: string
  url: string
  alt: string | null
  caption: string | null
  sort_order: number
  created_at: string
  updated_at: string | null
}
