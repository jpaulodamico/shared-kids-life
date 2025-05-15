
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export function useUserRole() {
  const [isPrimary, setIsPrimary] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const checkUserRole = async () => {
      if (!user) {
        setIsPrimary(null);
        setLoading(false);
        return;
      }

      try {
        // Chamada modificada para usar os parâmetros padrão da função
        // Isto garante que auth.uid() seja usado internamente
        const { data, error } = await supabase.rpc('is_primary_user');

        if (error) {
          console.error('Error checking user role:', error);
          toast.error('Erro ao verificar papel do usuário');
          setIsPrimary(false);
        } else {
          console.log('User role check result:', data);
          // Garantir que estamos lidando com um valor booleano explícito
          setIsPrimary(data === true);
        }
      } catch (error) {
        console.error('Error in useUserRole:', error);
        setIsPrimary(false);
      } finally {
        setLoading(false);
      }
    };

    checkUserRole();
  }, [user]);

  return { isPrimary, loading };
}
