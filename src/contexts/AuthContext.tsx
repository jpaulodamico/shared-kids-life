
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
    
    // First set up the listener to catch any auth state changes
    const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
      console.log("Auth state changed:", event, newSession?.user?.email);
      
      setSession(newSession);
      setUser(newSession?.user || null);
      
      // Show success message on successful sign in
      if (event === 'SIGNED_IN' && newSession?.user) {
        toast.success("Login realizado com sucesso", {
          description: `Bem-vindo, ${newSession.user.email}`
        });
      }
      
      // Show message on sign out
      if (event === 'SIGNED_OUT') {
        toast.info("Você saiu da sua conta", {
          description: "Volte logo!"
        });
      }
      
      setLoading(false);
    });

    // Then check for an existing session
    const getInitialSession = async () => {
      try {
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
      } catch (e) {
        console.error("Error checking session:", e);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    return () => {
      console.log("Unsubscribing from auth state changes");
      data.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
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
  };

  const signUp = async (email: string, password: string) => {
    try {
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
  };

  const signOut = async () => {
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
  };

  const signInWithGoogle = async () => {
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
