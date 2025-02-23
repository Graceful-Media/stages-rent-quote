export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      email_templates: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_deleted: boolean | null
          name: string
          status: Database["public"]["Enums"]["template_status"] | null
          subject: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_deleted?: boolean | null
          name: string
          status?: Database["public"]["Enums"]["template_status"] | null
          subject: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_deleted?: boolean | null
          name?: string
          status?: Database["public"]["Enums"]["template_status"] | null
          subject?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      quote_email_rate_limits: {
        Row: {
          count: number
          ip_address: string
          last_reset: string
        }
        Insert: {
          count?: number
          ip_address: string
          last_reset?: string
        }
        Update: {
          count?: number
          ip_address?: string
          last_reset?: string
        }
        Relationships: []
      }
      quotes: {
        Row: {
          created_at: string
          delivery_option: string | null
          delivery_zip_code: string | null
          dimensions: Json
          id: string
          recipient_email: string | null
          selected_services: string[]
          status: Database["public"]["Enums"]["quote_status"] | null
          total_cost: number
          updated_at: string
          user_id: string | null
          warehouse_location: string | null
        }
        Insert: {
          created_at?: string
          delivery_option?: string | null
          delivery_zip_code?: string | null
          dimensions: Json
          id?: string
          recipient_email?: string | null
          selected_services: string[]
          status?: Database["public"]["Enums"]["quote_status"] | null
          total_cost: number
          updated_at?: string
          user_id?: string | null
          warehouse_location?: string | null
        }
        Update: {
          created_at?: string
          delivery_option?: string | null
          delivery_zip_code?: string | null
          dimensions?: Json
          id?: string
          recipient_email?: string | null
          selected_services?: string[]
          status?: Database["public"]["Enums"]["quote_status"] | null
          total_cost?: number
          updated_at?: string
          user_id?: string | null
          warehouse_location?: string | null
        }
        Relationships: []
      }
      template_audit_logs: {
        Row: {
          action: string
          created_at: string | null
          created_by: string | null
          details: Json | null
          id: string
          template_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          created_by?: string | null
          details?: Json | null
          id?: string
          template_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          created_by?: string | null
          details?: Json | null
          id?: string
          template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "template_audit_logs_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      template_versions: {
        Row: {
          content: Json
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
          template_id: string | null
          version_number: number
        }
        Insert: {
          content: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          template_id?: string | null
          version_number: number
        }
        Update: {
          content?: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          template_id?: string | null
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "template_versions_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          user_id: string
          required_role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      quote_status: "pending" | "sent" | "accepted" | "rejected"
      template_status: "draft" | "published"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
