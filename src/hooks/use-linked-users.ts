
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

export interface LinkedUser {
  id: string;
  email: string;
  name: string;
  initials: string;
  status: string;
}

export function useLinkedUsers() {
  const [linkedUsers, setLinkedUsers] = useState<LinkedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  useEffect(() => {
    const fetchLinkedUsers = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        // Buscar convites enviados
        const { data, error } = await supabase
          .from('invites')
          .select('*')
          .eq('inviter_id', user.id);
          
        if (error) throw error;
        
        if (data) {
          // Formatar dados dos usuários vinculados
          const formatted = data.map(invite => ({
            id: invite.id,
            email: invite.email,
            name: invite.email.split('@')[0],
            initials: getInitials(invite.email.split('@')[0]),
            status: invite.status
          }));
          
          setLinkedUsers(formatted);
        }
      } catch (error) {
        console.error("Erro ao buscar usuários vinculados:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLinkedUsers();
  }, [user]);
  
  const refreshLinkedUsers = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('invites')
        .select('*')
        .eq('inviter_id', user.id);
          
      if (error) throw error;
      
      if (data) {
        const formatted = data.map(invite => ({
          id: invite.id,
          email: invite.email,
          name: invite.email.split('@')[0],
          initials: getInitials(invite.email.split('@')[0]),
          status: invite.status
        }));
        
        setLinkedUsers(formatted);
      }
    } catch (error) {
      console.error("Erro ao buscar usuários vinculados:", error);
    } finally {
      setLoading(false);
    }
  };
  
  return { linkedUsers, loading, refreshLinkedUsers };
}
