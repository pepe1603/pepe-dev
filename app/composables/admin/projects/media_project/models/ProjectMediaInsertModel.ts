// app/composables/admin/projects/media_project/models/ProjectMediaInsertModel.ts

export interface ProjectMediaInsertModel {
  projectId: string
  url: string
  alt?: string | null
  caption?: string | null
  name?: string
}
