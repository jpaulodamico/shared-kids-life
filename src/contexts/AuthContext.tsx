
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { toast } from "sonner";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any, data: any }>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<{ error: any }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Setting up auth state change listener");
    
    // Set up authentication state change listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log("Auth state changed:", event, newSession?.user?.email);
        setSession(newSession);
        setUser(newSession?.user || null);
        
        // Mensagem para o usuário quando ele é autenticado com sucesso
        if (event === 'SIGNED_IN' && newSession?.user) {
          toast.success("Login realizado com sucesso", {
            description: `Bem-vindo, ${newSession.user.email}`
          });
        }
        
        // Mensagem quando o usuário faz logout
        if (event === 'SIGNED_OUT') {
          toast.info("Você saiu da sua conta", {
            description: "Volte logo!"
          });
        }
        
        setLoading(false);
      }
    );

    // THEN check the current session
    const getSession = async () => {
      console.log("Getting current session");
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Erro ao carregar sessão:', error);
        toast.error('Erro ao carregar sessão', {
          description: error.message
        });
      }
      
      console.log("Current session:", session?.user?.email);
      setSession(session);
      setUser(session?.user || null);
      setLoading(false);
    };

    getSession();

    return () => {
      console.log("Unsubscribing from auth state changes");
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      return { error };
    } catch (error) {
      console.error("Error during sign in:", error);
      return { error };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });
      
      return { data, error };
    } catch (error) {
      console.error("Error during sign up:", error);
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      console.log("Signing out");
      await supabase.auth.signOut();
      console.log("Signed out successfully");
    } catch (error) {
      console.error("Error during sign out:", error);
      toast.error('Erro ao fazer logout', {
        description: 'Ocorreu um erro ao encerrar sua sessão.'
      });
    }
  };

  const signInWithGoogle = async () => {
    console.log("Initiating Google sign in");
    try {
      // Usar a URL atual como redirect
      const origin = window.location.origin;
      const redirectTo = `${origin}/auth`;
      
      console.log("Redirect URL:", redirectTo);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectTo,
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
  };

  const value = {
    session,
    user,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context;
};
