
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { toast } from "sonner";

export function useAuthProvider() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    console.log("Setting up auth state change listener");
    
    // First set up the listener to catch any auth state changes
    const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
      console.log("Auth state changed:", event, newSession?.user?.email);
      
      setSession(newSession);
      setUser(newSession?.user || null);
      
      if (event === 'SIGNED_IN' && newSession?.user) {
        // Check if this is a new user (first sign in)
        const signedUpAt = newSession.user.created_at;
        const currentTime = new Date().toISOString();
        
        // If the account was created less than 5 minutes ago, consider it a new user
        const isNewSignUp = Math.abs(new Date(currentTime).getTime() - new Date(signedUpAt).getTime()) < 5 * 60 * 1000;
        setIsNewUser(isNewSignUp);
        
        toast.success("Login realizado com sucesso", {
          description: `Bem-vindo, ${newSession.user.email}`
        });
      }
      
      // Show message on sign out
      if (event === 'SIGNED_OUT') {
        toast.info("Você saiu da sua conta", {
          description: "Volte logo!"
        });
        
        // Redirect to home page
        if (window.location.pathname !== '/') {
          window.location.href = '/';
        }
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
        
        // For existing sessions, set isNewUser to false
        setIsNewUser(false);
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

  return {
    session,
    user,
    loading,
    isNewUser,
    setIsNewUser
  };
}
