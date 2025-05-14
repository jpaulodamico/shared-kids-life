
import { createClient } from '@supabase/supabase-js';

// Supabase Project
const projectId = 'ycmfluvtqrwuaxjhzhxj';
const supabaseUrl = `https://${projectId}.supabase.co`;
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljbWZsdXZ0cXJ3dWF4amh6aHhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxODk1MTMsImV4cCI6MjA2Mjc2NTUxM30.6ZhAMFQQHylpwCkpyR_Bk5HTFUTNwCZSCzLQrWaEHAA';

// Create the Supabase client with correct auth configurations
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage, // Use localStorage to persist the session
    persistSession: true,  // Persist the session between page reloads
    autoRefreshToken: true, // Auto refresh tokens
    detectSessionInUrl: true, // Detect the session in the URL (important for OAuth)
    flowType: 'implicit' // Use implicit flow for OAuth
  }
});

// Export a function to test the connection with Supabase
export const testSupabaseConnection = async () => {
  try {
    // Try to check the connection using the 'profiles' table that already exists in the database
    const { data, error } = await supabase.from('profiles').select('id').limit(1);
    
    if (error) {
      return { connected: false, error: error.message };
    }
    
    return { connected: true };
  } catch (error) {
    return { 
      connected: false, 
      error: 'Não foi possível conectar ao Supabase. Verifique se seu projeto está conectado corretamente.'
    };
  }
};

// Função para criar a tabela de convites (executar apenas uma vez via console se necessário)
export const setupInvitesTable = async () => {
  const { error } = await supabase.rpc('create_invites_table');
  
  if (error) {
    console.error('Erro ao criar tabela de convites:', error);
    return false;
  }
  
  return true;
};
