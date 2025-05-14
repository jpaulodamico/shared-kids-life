
import { createClient } from '@supabase/supabase-js';

// Tenta acessar as variáveis de ambiente do Supabase
let supabaseUrl: string;
let supabaseAnonKey: string;

try {
  supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Variáveis de ambiente do Supabase não encontradas');
  }
} catch (error) {
  // Valor temporário para desenvolvimento
  console.warn('⚠️ Usando valores de desenvolvimento para o Supabase. Conecte-se ao Supabase para produção.');
  
  // Valores temporários para permitir o desenvolvimento sem erro de tela em branco
  supabaseUrl = 'https://temporary-development-url.supabase.co';
  supabaseAnonKey = 'temporary-development-key';
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Exporta uma função para testar a conexão com o Supabase
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('test').select('*').limit(1);
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
