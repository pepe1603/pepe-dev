// app/composables/admin/projects/media_project/models/ProjectMediaItemModel.ts

export interface ProjectMediaItemModel {
  id: string
  projectId: string
  url: string
  alt: string | null
  caption: string | null
  sortOrder: number | null


  // extensiones
  name?: string | null
}
