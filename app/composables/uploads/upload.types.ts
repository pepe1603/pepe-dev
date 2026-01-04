//app/cmposables/uploads/upload.types.ts
export type UploadBucket =
  | 'avatars'
  | 'documents'
  | 'project-media'
  | 'project-thumbnails'

export type UploadTarget =
  | 'avatar'
  | 'cv'
  | 'certificate'
  | 'contract'
  | 'invoice'
  | 'project-thumbnail'
  | 'project-media'

export interface UploadResult {
  path: string
  publicUrl: string | null
}

export interface UploadExtraParams {
  userId?: string
  projectSlug?: string
  filename?: string
}

export interface UploadPathParams {
  extension: string
  extra?: UploadExtraParams
}
