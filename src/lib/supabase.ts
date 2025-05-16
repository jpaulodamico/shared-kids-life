
// Use the client from the integrations folder instead of duplicating
import { supabase } from '@/integrations/supabase/client';

// Export the client
export { supabase };

// Export a function to test the connection with Supabase
export const testSupabaseConnection = async () => {
  try {
    // Try to check the connection using any public table
    const { data, error } = await supabase.from('profiles').select('id').limit(1);
    
    if (error) {
      console.error("Supabase connection error:", error);
      return { connected: false, error: error.message };
    }
    
    console.log("Supabase connection successful");
    return { connected: true };
  } catch (error) {
    console.error("Supabase connection exception:", error);
    return { 
      connected: false, 
      error: 'Não foi possível conectar ao Supabase. Verifique se seu projeto está conectado corretamente.'
    };
  }
};
