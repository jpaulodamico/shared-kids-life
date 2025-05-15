
import { supabase } from '@/lib/supabase';
import { toast } from "sonner";

export async function signIn(email: string, password: string) {
  try {
    console.log("Attempting to sign in with email/password");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) console.error("Sign in error:", error);
    return { error };
  } catch (error) {
    console.error("Error during sign in:", error);
    return { error };
  }
}

export async function signUp(email: string, password: string) {
  try {
    console.log("Attempting to sign up with email/password");
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });
    
    if (error) console.error("Sign up error:", error);
    else if (data.user) {
      toast.success("Conta criada com sucesso!", {
        description: "Verifique seu email para confirmar sua conta."
      });
    }
    return { data, error };
  } catch (error) {
    console.error("Error during sign up:", error);
    return { data: null, error };
  }
}

export async function signOut() {
  try {
    console.log("Signing out");
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    console.log("Signed out successfully");
  } catch (error) {
    console.error("Error during sign out:", error);
    toast.error('Erro ao fazer logout', {
      description: 'Ocorreu um erro ao encerrar sua sessão.'
    });
  }
}

export async function signInWithGoogle() {
  console.log("Initiating Google sign in");
  try {
    // Get the current URL origin for redirect
    const origin = window.location.origin;
    
    // Add /auth to make sure we redirect back to the auth page
    const redirectTo = `${origin}/auth`;
    
    console.log("Redirect URL:", redirectTo);
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    });
    
    if (error) {
      console.error("Error with Google sign in:", error);
    }
    
    return { error };
  } catch (error) {
    console.error("Unexpected error during Google sign in:", error);
    return { error };
  }
}
