
import { Database } from '@/integrations/supabase/types';

// Extend the generated Database type with our missing tables
export interface ExtendedDatabase extends Database {
  public: {
    Tables: {
      // Include existing tables from the generated types
      children: Database['public']['Tables']['children'];
      profiles: Database['public']['Tables']['profiles'];
      
      // Add missing tables
      invites: {
        Row: {
          id: string;
          email: string;
          inviter_id: string;
          code: string;
          relation: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          inviter_id: string;
          code: string;
          relation: string;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          inviter_id?: string;
          code?: string;
          relation?: string;
          status?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "invites_inviter_id_fkey";
            columns: ["inviter_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      user_children: {
        Row: {
          id: string;
          user_id: string;
          child_id: string;
          relation: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          child_id: string;
          relation: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          child_id?: string;
          relation?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_children_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_children_child_id_fkey";
            columns: ["child_id"];
            referencedRelation: "children";
            referencedColumns: ["id"];
          }
        ];
      };
      user_roles: {
        Row: {
          id: string;
          user_id: string;
          is_primary: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          is_primary?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          is_primary?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Database['public']['Views'];
    Functions: Database['public']['Functions'];
    Enums: Database['public']['Enums'];
    CompositeTypes: Database['public']['CompositeTypes'];
  };
}

// Function to add is_primary role check for user
export async function isPrimaryUser(id: string | undefined) {
  if (!id) return false;
  
  try {
    const { data: roleData } = await supabase.rpc('is_primary_user');
    return roleData === true;
  } catch (error) {
    console.error("Error checking primary user role:", error);
    return false;
  }
}

// Re-export supabase with extended types
import { supabase as originalSupabase } from '@/integrations/supabase/client';
export const supabase = originalSupabase as unknown as ReturnType<typeof import('@supabase/supabase-js').createClient<ExtendedDatabase>>;
