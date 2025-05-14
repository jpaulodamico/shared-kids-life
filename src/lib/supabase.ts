
import { createClient } from '@supabase/supabase-js';

// Tenta acessar as variáveis de ambiente do Supabase
let supabaseUrl: string;
let supabaseAnonKey: string;

try {
  const projectId = 'ycmfluvtqrwuaxjhzhxj';
  supabaseUrl = `https://${projectId}.supabase.co`;
  supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljbWZsdXZ0cXJ3dWF4amh6aHhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxODk1MTMsImV4cCI6MjA2Mjc2NTUxM30.6ZhAMFQQHylpwCkpyR_Bk5HTFUTNwCZSCzLQrWaEHAA';

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Variáveis de ambiente do Supabase não encontradas');
  }
} catch (error) {
  // Valor temporário para desenvolvimento
  console.warn('⚠️ Usando valores de desenvolvimento para o Supabase. Conecte-se ao Supabase para produção.');
  
  // Valores temporários para permitir o desenvolvimento sem erro de tela em branco
  supabaseUrl = 'https://ycmfluvtqrwuaxjhzhxj.supabase.co';
  supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljbWZsdXZ0cXJ3dWF4amh6aHhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxODk1MTMsImV4cCI6MjA2Mjc2NTUxM30.6ZhAMFQQHylpwCkpyR_Bk5HTFUTNwCZSCzLQrWaEHAA';
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
