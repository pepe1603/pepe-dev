//app/composables/admin/profile/models/ProfileFormModel.ts
export interface ProfileFormModel {
  fullName: string
  headline: string
  bio: string
  location: string
  emailPublic: string

  avatarUrl: string | null
  avatarFile: File | null

  cvUrl: string | null
  cvFile: File | null

  socials: {
    github: string
    linkedin: string
    twitter: string
    website: string
  }
}
