// app/composables/uploads/useUploadService.ts
import { uploadConfig } from './upload.config'
import type {
  UploadResult,
  UploadTarget,
  UploadExtraParams
} from './upload.types'

export function useUploadService () {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const upload = async (
    file: File,
    target: UploadTarget,
    extra?: UploadExtraParams
  ): Promise<UploadResult> => {
    if (!user.value) {
      throw new Error('Usuario no autenticado')
    }

    const config = uploadConfig[target]
    if (!config) {
      throw new Error('Target de upload no soportado')
    }

    // Tamaño
    const maxSizeBytes = config.maxSizeMB * 1024 * 1024
    if (file.size > maxSizeBytes) {
      throw new Error(`Archivo excede ${config.maxSizeMB}MB`)
    }

    // MIME
    if (
      !config.mimeTypes.some(type =>
        type.endsWith('/*')
          ? file.type.startsWith(type.replace('/*', ''))
          : file.type === type
      )
    ) {
      throw new Error('Tipo de archivo no permitido')
    }

    const extension = file.name.split('.').pop()!

    // userId se inyecta automáticamente si no viene
    const resolvedExtra: UploadExtraParams = {
      ...extra,
      userId: extra?.userId ?? user.value.sub
    }

    const path = config.buildPath({
      extension,
      extra: resolvedExtra
    })

    const { error } = await supabase.storage
      .from(config.bucket)
      .upload(path, file, { upsert: true })

    if (error) throw error

    let publicUrl: string | null = null

    if (
      config.bucket === 'avatars' ||
      
      config.bucket === 'project-thumbnails' ||
      config.bucket === 'project-media'
      
    ) {
      const { data } = supabase.storage
        .from(config.bucket)
        .getPublicUrl(path)

      publicUrl = data.publicUrl
    }
    
    return { path, publicUrl }
  }

  

  return { upload }
}
