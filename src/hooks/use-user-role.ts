
import { useState, useEffect } from "react";
import { supabase } from "@/lib/database-types";
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
        // Chamada sem parâmetros para usar auth.uid() internamente na função
        const { data, error } = await supabase.rpc('is_primary_user');

        if (error) {
          console.error('Error checking user role:', error);
          toast.error('Erro ao verificar papel do usuário');
          setIsPrimary(false);
        } else {
          console.log('User role check result:', data);
          // Garantir explicitamente que tratamos o valor como um booleano
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
