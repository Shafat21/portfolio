export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          description: string
          tech_stack: string
          link: string | null
          github_link: string | null
          icon_name: string
          type: 'live' | 'github'
          category: string
          featured: boolean
          pinned: boolean
          order_index: number
          image_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          description: string
          tech_stack: string
          link?: string | null
          github_link?: string | null
          icon_name: string
          type: 'live' | 'github'
          category: string
          featured?: boolean
          pinned?: boolean
          order_index?: number
          image_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          description?: string
          tech_stack?: string
          link?: string | null
          github_link?: string | null
          icon_name?: string
          type?: 'live' | 'github'
          category?: string
          featured?: boolean
          pinned?: boolean
          order_index?: number
          image_url?: string | null
        }
      }
      testimonials: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          role: string
          company: string
          content: string
          avatar_url: string | null
          rating: number
          order_index: number
          published: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          role: string
          company: string
          content: string
          avatar_url?: string | null
          rating?: number
          order_index?: number
          published?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          role?: string
          company?: string
          content?: string
          avatar_url?: string | null
          rating?: number
          order_index?: number
          published?: boolean
        }
      }
      education: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          institution: string
          degree: string
          field_of_study: string
          start_date: string
          end_date: string | null
          current: boolean
          description: string | null
          location: string | null
          gpa: string | null
          order_index: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          institution: string
          degree: string
          field_of_study: string
          start_date: string
          end_date?: string | null
          current?: boolean
          description?: string | null
          location?: string | null
          gpa?: string | null
          order_index?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          institution?: string
          degree?: string
          field_of_study?: string
          start_date?: string
          end_date?: string | null
          current?: boolean
          description?: string | null
          location?: string | null
          gpa?: string | null
          order_index?: number
        }
      }
      experience: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          company: string
          position: string
          start_date: string
          end_date: string | null
          current: boolean
          description: string | null
          location: string | null
          employment_type: string
          technologies: string[]
          order_index: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          company: string
          position: string
          start_date: string
          end_date?: string | null
          current?: boolean
          description?: string | null
          location?: string | null
          employment_type: string
          technologies?: string[]
          order_index?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          company?: string
          position?: string
          start_date?: string
          end_date?: string | null
          current?: boolean
          description?: string | null
          location?: string | null
          employment_type?: string
          technologies?: string[]
          order_index?: number
        }
      }
      skills: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          category: string
          proficiency: number
          icon_name: string | null
          order_index: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          category: string
          proficiency?: number
          icon_name?: string | null
          order_index?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          category?: string
          proficiency?: number
          icon_name?: string | null
          order_index?: number
        }
      }
      admin_users: {
        Row: {
          id: string
          created_at: string
          email: string
          role: string
          last_login: string | null
        }
        Insert: {
          id: string
          created_at?: string
          email: string
          role?: string
          last_login?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          role?: string
          last_login?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
