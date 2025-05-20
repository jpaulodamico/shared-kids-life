
import { useState, useEffect } from "react";
import { supabase } from "@/lib/database-types";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export interface LinkedUser {
  id: string;
  email: string;
  name: string;
  initials: string;
  status: string;
  created_at: string;
  formatted_date: string;
  code: string;
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

  const formatInviteStatus = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'active':
        return 'Aceito';
      case 'expired':
        return 'Expirado';
      case 'rejected':
        return 'Rejeitado';
      default:
        return status;
    }
  };
  
  const fetchLinkedUsers = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      // Buscar convites enviados com ordenação por data de criação (mais recentes primeiro)
      const { data, error } = await supabase
        .from('invites')
        .select('*')
        .eq('inviter_id', user.id)
        .order('created_at', { ascending: false });
          
      if (error) throw error;
      
      if (data) {
        // Formatar dados dos usuários vinculados
        const formatted = data.map(invite => ({
          id: invite.id,
          email: invite.email,
          name: invite.email.split('@')[0],
          initials: getInitials(invite.email.split('@')[0]),
          status: formatInviteStatus(invite.status),
          created_at: invite.created_at,
          formatted_date: format(new Date(invite.created_at), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }),
          code: invite.code
        }));
        
        setLinkedUsers(formatted);
      }
    } catch (error) {
      console.error("Erro ao buscar usuários vinculados:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchLinkedUsers();
  }, [user]);
  
  const refreshLinkedUsers = async () => {
    await fetchLinkedUsers();
  };
  
  return { linkedUsers, loading, refreshLinkedUsers };
}
