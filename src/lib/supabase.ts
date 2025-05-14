
import { createClient } from '@supabase/supabase-js';

// Estas variáveis de ambiente são injetadas automaticamente pelo Lovable quando você conecta ao Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltam variáveis de ambiente do Supabase. Verifique se o projeto está conectado ao Supabase.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
