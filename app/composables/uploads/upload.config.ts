//app/cmposables/uploads/upload.config.ts
import type {
  UploadBucket,
  UploadTarget,
  UploadPathParams
} from './upload.types'
import { slugify } from '~/utils/slugify'


export const uploadConfig: Record<
  UploadTarget,
  {
    bucket: UploadBucket
    maxSizeMB: number
    mimeTypes: string[]
    buildPath: (params: UploadPathParams) => string
  }
> = {
  /* =========================
     AVATAR (1 por usuario)
  ========================== */
  avatars: {
    bucket: 'avatars',
    maxSizeMB: 10,
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    buildPath: ({ extension, extra }) => {
      if (!extra?.userId) {
        throw new Error('userId es requerido para avatar')
      }
      return `user-${extra.userId}.${extension}`
    }
  },

  /* =========================
     DOCUMENTS (raíz del bucket)
  ========================== */
  cv: {
    bucket: 'documents',
    maxSizeMB: 10,
    mimeTypes: ['application/pdf'],
    buildPath: ({ extension, extra }) => {
      if (!extra?.fullName) {
        throw new Error('fullName es requerido para cv')
      }

      const slug = slugify(extra.fullName)

      return `cv-${slug}.${extension}`
    }
  },

  certificate: {
    bucket: 'documents',
    maxSizeMB: 10,
    mimeTypes: ['application/pdf'],
    buildPath: ({ extension, extra }) => {
      if (!extra?.userId) {
        throw new Error('userId es requerido para certificate')
      }
      return `certificate-${extra.userId}.${extension}`
    }
  },

  contract: {
    bucket: 'documents',
    maxSizeMB: 10,
    mimeTypes: ['application/pdf'],
    buildPath: ({ extension, extra }) => {
      if (!extra?.userId) {
        throw new Error('userId es requerido para contract')
      }
      return `contract-${extra.userId}.${extension}`
    }
  },

  invoice: {
    bucket: 'documents',
    maxSizeMB: 10,
    mimeTypes: ['application/pdf'],
    buildPath: ({ extension, extra }) => {
      if (!extra?.userId) {
        throw new Error('userId es requerido para invoice')
      }
      return `invoice-${extra.userId}.${extension}`
    }
  },

  /* =========================
     PROJECT THUMBNAIL (1 por proyecto)
  ========================== */
  'project-thumbnails': {
    bucket: 'project-thumbnails',
    maxSizeMB: 5,
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
    buildPath: ({ extension, extra }) => {
      if (!extra?.projectSlug) {
        throw new Error('projectSlug es requerido para project-thumbnail')
      }
      return `${extra.projectSlug}.${extension}`
    }
  },

  /* =========================
    PROJECT MEDIA (solo imágenes)
  ========================== */
  'project-media': {
    bucket: 'project-media',
    maxSizeMB: 10,
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
    buildPath: ({ extension, extra }) => {
      if (!extra?.projectSlug) {
        throw new Error('projectSlug es requerido para project-media')
      }

      const filename =
        extra.filename ??
        `image-${Date.now()}.${extension}`

      return `${extra.projectSlug}/${filename}`
    }
  }

}
