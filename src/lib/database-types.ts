
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
        // This needs to match what's in the original Database type
        Relationships: [];
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
        // Update to match the expected structure from Supabase's generated types
        Relationships: [
          {
            foreignKeyName: "user_children_child_id_fkey";
            columns: ["child_id"];
            isOneToOne: false;
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
        // Fix: Update the Relationships to be an empty array to match the Database type
        Relationships: [];
      };
    };
    Views: Database['public']['Views'];
    Functions: Database['public']['Functions'] & {
      // Add the missing is_primary_user function
      is_primary_user: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
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
