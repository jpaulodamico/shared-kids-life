
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
        // Call the is_primary_user function to check if the user is a primary user
        const { data, error } = await supabase
          .rpc('is_primary_user', { user_uuid: user.id });

        if (error) {
          console.error('Error checking user role:', error);
          toast.error('Erro ao verificar papel do usuário');
          setIsPrimary(false);
        } else {
          console.log('User role check result:', data);
          setIsPrimary(data);
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
