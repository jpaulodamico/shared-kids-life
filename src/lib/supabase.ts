
import { createClient } from '@supabase/supabase-js';

// Projeto Supabase
const projectId = 'ycmfluvtqrwuaxjhzhxj';
const supabaseUrl = `https://${projectId}.supabase.co`;
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljbWZsdXZ0cXJ3dWF4amh6aHhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxODk1MTMsImV4cCI6MjA2Mjc2NTUxM30.6ZhAMFQQHylpwCkpyR_Bk5HTFUTNwCZSCzLQrWaEHAA';

// Criamos o cliente Supabase com as configurações de autenticação corretas
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage, // Usamos localStorage para persistir a sessão
    persistSession: true,  // Persistir a sessão entre recargas da página
    autoRefreshToken: true, // Renovar o token automaticamente
    detectSessionInUrl: true, // Detectar a sessão na URL (importante para OAuth)
    flowType: 'implicit' // Usar fluxo implícito para OAuth
  }
});

// Exporta uma função para testar a conexão com o Supabase
export const testSupabaseConnection = async () => {
  try {
    // Tenta verificar a conexão usando a tabela 'profiles' que já existe no banco de dados
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
