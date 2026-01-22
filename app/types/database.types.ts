//app/types/database.types.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      audit_log: {
        Row: {
          action: string
          id: string
          ip_hash: string | null
          new_values: Json | null
          old_values: Json | null
          performed_at: string
          performed_by: string
          record_id: string
          table_name: string
          user_agent: string | null
        }
        Insert: {
          action: string
          id?: string
          ip_hash?: string | null
          new_values?: Json | null
          old_values?: Json | null
          performed_at?: string
          performed_by?: string
          record_id: string
          table_name: string
          user_agent?: string | null
        }
        Update: {
          action?: string
          id?: string
          ip_hash?: string | null
          new_values?: Json | null
          old_values?: Json | null
          performed_at?: string
          performed_by?: string
          record_id?: string
          table_name?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      experiences: {
        Row: {
          archived_at: string | null
          archived_by: string | null
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          description: string
          end_date: string | null
          id: string
          location: string | null
          published_at: string | null
          published_by: string | null
          related_project_id: string | null
          restored_at: string | null
          restored_by: string | null
          sort_order: number
          start_date: string
          status: Database["public"]["Enums"]["record_status"]
          subtitle: string | null
          title: string
          trashed_at: string | null
          trashed_by: string | null
          type: Database["public"]["Enums"]["experience_type"]
          updated_at: string | null
          updated_by: string | null
          url: string | null
        }
        Insert: {
          archived_at?: string | null
          archived_by?: string | null
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          description: string
          end_date?: string | null
          id?: string
          location?: string | null
          published_at?: string | null
          published_by?: string | null
          related_project_id?: string | null
          restored_at?: string | null
          restored_by?: string | null
          sort_order?: number
          start_date: string
          status?: Database["public"]["Enums"]["record_status"]
          subtitle?: string | null
          title: string
          trashed_at?: string | null
          trashed_by?: string | null
          type?: Database["public"]["Enums"]["experience_type"]
          updated_at?: string | null
          updated_by?: string | null
          url?: string | null
        }
        Update: {
          archived_at?: string | null
          archived_by?: string | null
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string
          end_date?: string | null
          id?: string
          location?: string | null
          published_at?: string | null
          published_by?: string | null
          related_project_id?: string | null
          restored_at?: string | null
          restored_by?: string | null
          sort_order?: number
          start_date?: string
          status?: Database["public"]["Enums"]["record_status"]
          subtitle?: string | null
          title?: string
          trashed_at?: string | null
          trashed_by?: string | null
          type?: Database["public"]["Enums"]["experience_type"]
          updated_at?: string | null
          updated_by?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "experiences_related_project_id_fkey"
            columns: ["related_project_id"]
            isOneToOne: false
            referencedRelation: "experiences_public"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "experiences_related_project_id_fkey"
            columns: ["related_project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "experiences_related_project_id_fkey"
            columns: ["related_project_id"]
            isOneToOne: false
            referencedRelation: "projects_public"
            referencedColumns: ["id"]
          },
        ]
      }
      media: {
        Row: {
          alt: string | null
          caption: string | null
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          id: string
          name: string
          project_id: string
          published_at: string | null
          published_by: string | null
          restored_at: string | null
          restored_by: string | null
          sort_order: number
          status: Database["public"]["Enums"]["record_status"]
          trashed_at: string | null
          trashed_by: string | null
          type: string
          updated_at: string | null
          updated_by: string | null
          url: string
        }
        Insert: {
          alt?: string | null
          caption?: string | null
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          name: string
          project_id: string
          published_at?: string | null
          published_by?: string | null
          restored_at?: string | null
          restored_by?: string | null
          sort_order?: number
          status?: Database["public"]["Enums"]["record_status"]
          trashed_at?: string | null
          trashed_by?: string | null
          type: string
          updated_at?: string | null
          updated_by?: string | null
          url: string
        }
        Update: {
          alt?: string | null
          caption?: string | null
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          name?: string
          project_id?: string
          published_at?: string | null
          published_by?: string | null
          restored_at?: string | null
          restored_by?: string | null
          sort_order?: number
          status?: Database["public"]["Enums"]["record_status"]
          trashed_at?: string | null
          trashed_by?: string | null
          type?: string
          updated_at?: string | null
          updated_by?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "media_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "experiences_public"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "media_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects_public"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          archived_at: string | null
          archived_by: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string
          created_by: string
          cv_url: string | null
          deleted_at: string | null
          deleted_by: string | null
          email_public: string | null
          full_name: string
          github_url: string | null
          headline: string | null
          id: string
          linkedin_url: string | null
          location: string | null
          metadata: Json
          published_at: string | null
          published_by: string | null
          restored_at: string | null
          restored_by: string | null
          status: Database["public"]["Enums"]["record_status"]
          trashed_at: string | null
          trashed_by: string | null
          twitter_url: string | null
          updated_at: string | null
          updated_by: string | null
          views_count: number
          website_url: string | null
        }
        Insert: {
          archived_at?: string | null
          archived_by?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          created_by?: string
          cv_url?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          email_public?: string | null
          full_name: string
          github_url?: string | null
          headline?: string | null
          id: string
          linkedin_url?: string | null
          location?: string | null
          metadata?: Json
          published_at?: string | null
          published_by?: string | null
          restored_at?: string | null
          restored_by?: string | null
          status?: Database["public"]["Enums"]["record_status"]
          trashed_at?: string | null
          trashed_by?: string | null
          twitter_url?: string | null
          updated_at?: string | null
          updated_by?: string | null
          views_count?: number
          website_url?: string | null
        }
        Update: {
          archived_at?: string | null
          archived_by?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          created_by?: string
          cv_url?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          email_public?: string | null
          full_name?: string
          github_url?: string | null
          headline?: string | null
          id?: string
          linkedin_url?: string | null
          location?: string | null
          metadata?: Json
          published_at?: string | null
          published_by?: string | null
          restored_at?: string | null
          restored_by?: string | null
          status?: Database["public"]["Enums"]["record_status"]
          trashed_at?: string | null
          trashed_by?: string | null
          twitter_url?: string | null
          updated_at?: string | null
          updated_by?: string | null
          views_count?: number
          website_url?: string | null
        }
        Relationships: []
      }
      project_technologies: {
        Row: {
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          project_id: string
          sort_order: number
          technology_id: string
          trashed_at: string | null
          trashed_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          project_id: string
          sort_order?: number
          technology_id: string
          trashed_at?: string | null
          trashed_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          project_id?: string
          sort_order?: number
          technology_id?: string
          trashed_at?: string | null
          trashed_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_technologies_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "experiences_public"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_technologies_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_technologies_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_technologies_technology_id_fkey"
            columns: ["technology_id"]
            isOneToOne: false
            referencedRelation: "technologies"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          archived_at: string | null
          archived_by: string | null
          content: Json
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          demo_url: string | null
          description: string
          id: string
          is_featured: boolean
          published_at: string | null
          published_by: string | null
          repo_url: string | null
          restored_at: string | null
          restored_by: string | null
          short_description: string
          slug: string
          status: Database["public"]["Enums"]["record_status"]
          subtitle: string | null
          tags: string[]
          thumbnail_url: string | null
          title: string
          trashed_at: string | null
          trashed_by: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          archived_at?: string | null
          archived_by?: string | null
          content?: Json
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          demo_url?: string | null
          description: string
          id?: string
          is_featured?: boolean
          published_at?: string | null
          published_by?: string | null
          repo_url?: string | null
          restored_at?: string | null
          restored_by?: string | null
          short_description: string
          slug: string
          status?: Database["public"]["Enums"]["record_status"]
          subtitle?: string | null
          tags?: string[]
          thumbnail_url?: string | null
          title: string
          trashed_at?: string | null
          trashed_by?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          archived_at?: string | null
          archived_by?: string | null
          content?: Json
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          demo_url?: string | null
          description?: string
          id?: string
          is_featured?: boolean
          published_at?: string | null
          published_by?: string | null
          repo_url?: string | null
          restored_at?: string | null
          restored_by?: string | null
          short_description?: string
          slug?: string
          status?: Database["public"]["Enums"]["record_status"]
          subtitle?: string | null
          tags?: string[]
          thumbnail_url?: string | null
          title?: string
          trashed_at?: string | null
          trashed_by?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      skills: {
        Row: {
          archived_at: string | null
          archived_by: string | null
          category: string | null
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          display_order: number
          id: string
          level: Database["public"]["Enums"]["skill_level"]
          name: string
          published_at: string | null
          published_by: string | null
          restored_at: string | null
          restored_by: string | null
          status: Database["public"]["Enums"]["record_status"]
          trashed_at: string | null
          trashed_by: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          archived_at?: string | null
          archived_by?: string | null
          category?: string | null
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          display_order?: number
          id?: string
          level?: Database["public"]["Enums"]["skill_level"]
          name: string
          published_at?: string | null
          published_by?: string | null
          restored_at?: string | null
          restored_by?: string | null
          status?: Database["public"]["Enums"]["record_status"]
          trashed_at?: string | null
          trashed_by?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          archived_at?: string | null
          archived_by?: string | null
          category?: string | null
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          display_order?: number
          id?: string
          level?: Database["public"]["Enums"]["skill_level"]
          name?: string
          published_at?: string | null
          published_by?: string | null
          restored_at?: string | null
          restored_by?: string | null
          status?: Database["public"]["Enums"]["record_status"]
          trashed_at?: string | null
          trashed_by?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      technologies: {
        Row: {
          archived_at: string | null
          archived_by: string | null
          color: string | null
          created_at: string
          created_by: string
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          published_at: string | null
          published_by: string | null
          restored_at: string | null
          restored_by: string | null
          status: Database["public"]["Enums"]["record_status"]
          trashed_at: string | null
          trashed_by: string | null
          updated_at: string | null
          updated_by: string | null
          website_url: string | null
        }
        Insert: {
          archived_at?: string | null
          archived_by?: string | null
          color?: string | null
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          published_at?: string | null
          published_by?: string | null
          restored_at?: string | null
          restored_by?: string | null
          status?: Database["public"]["Enums"]["record_status"]
          trashed_at?: string | null
          trashed_by?: string | null
          updated_at?: string | null
          updated_by?: string | null
          website_url?: string | null
        }
        Update: {
          archived_at?: string | null
          archived_by?: string | null
          color?: string | null
          created_at?: string
          created_by?: string
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          published_at?: string | null
          published_by?: string | null
          restored_at?: string | null
          restored_by?: string | null
          status?: Database["public"]["Enums"]["record_status"]
          trashed_at?: string | null
          trashed_by?: string | null
          updated_at?: string | null
          updated_by?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      dashboard_items: {
        Row: {
          created_at: string | null
          entity: string | null
          id: string | null
          status: Database["public"]["Enums"]["record_status"] | null
          title: string | null
          updated_at: string | null
        }
        Relationships: []
      }
      experiences_public: {
        Row: {
          description: string | null
          end_date: string | null
          id: string | null
          location: string | null
          project_id: string | null
          project_slug: string | null
          project_thumbnail_url: string | null
          project_title: string | null
          sort_order: number | null
          start_date: string | null
          subtitle: string | null
          title: string | null
          type: Database["public"]["Enums"]["experience_type"] | null
          url: string | null
        }
        Relationships: []
      }
      profiles_public: {
        Row: {
          avatar_url: string | null
          bio: string | null
          email_public: string | null
          full_name: string | null
          github_url: string | null
          headline: string | null
          id: string | null
          linkedin_url: string | null
          location: string | null
          twitter_url: string | null
          website_url: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          email_public?: string | null
          full_name?: string | null
          github_url?: string | null
          headline?: string | null
          id?: string | null
          linkedin_url?: string | null
          location?: string | null
          twitter_url?: string | null
          website_url?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          email_public?: string | null
          full_name?: string | null
          github_url?: string | null
          headline?: string | null
          id?: string | null
          linkedin_url?: string | null
          location?: string | null
          twitter_url?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      projects_public: {
        Row: {
          demo_url: string | null
          description: string | null
          id: string | null
          is_featured: boolean | null
          published_at: string | null
          repo_url: string | null
          short_description: string | null
          slug: string | null
          subtitle: string | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string | null
        }
        Insert: {
          demo_url?: string | null
          description?: string | null
          id?: string | null
          is_featured?: boolean | null
          published_at?: string | null
          repo_url?: string | null
          short_description?: string | null
          slug?: string | null
          subtitle?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string | null
        }
        Update: {
          demo_url?: string | null
          description?: string | null
          id?: string | null
          is_featured?: boolean | null
          published_at?: string | null
          repo_url?: string | null
          short_description?: string | null
          slug?: string | null
          subtitle?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string | null
        }
        Relationships: []
      }
      skills_public: {
        Row: {
          category: string | null
          description: string | null
          display_order: number | null
          id: string | null
          level: Database["public"]["Enums"]["skill_level"] | null
          name: string | null
        }
        Insert: {
          category?: string | null
          description?: string | null
          display_order?: number | null
          id?: string | null
          level?: Database["public"]["Enums"]["skill_level"] | null
          name?: string | null
        }
        Update: {
          category?: string | null
          description?: string | null
          display_order?: number | null
          id?: string | null
          level?: Database["public"]["Enums"]["skill_level"] | null
          name?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      current_user_id: { Args: never; Returns: string }
    }
    Enums: {
      experience_type:
        | "work"
        | "education"
        | "certification"
        | "volunteer"
        | "talk"
        | "publication"
      record_status: "draft" | "published" | "archived" | "trashed"
      skill_level: "basic" | "intermediate" | "advanced" | "expert"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      experience_type: [
        "work",
        "education",
        "certification",
        "volunteer",
        "talk",
        "publication",
      ],
      record_status: ["draft", "published", "archived", "trashed"],
      skill_level: ["basic", "intermediate", "advanced", "expert"],
    },
  },
} as const
