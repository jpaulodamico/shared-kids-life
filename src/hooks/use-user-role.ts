
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
        console.log("Checking user role for:", user.id);
        // Call the database function without parameters
        const { data, error } = await supabase.rpc('is_primary_user');

        if (error) {
          console.error('Error checking user role:', error);
          toast.error('Erro ao verificar papel do usuário');
          setIsPrimary(false);
        } else {
          console.log('User role check result:', data);
          // Make sure we properly handle the boolean value
          setIsPrimary(Boolean(data));
        }
      } catch (error) {
        console.error('Exception in useUserRole:', error);
        setIsPrimary(false);
        toast.error('Erro ao verificar papel do usuário');
      } finally {
        setLoading(false);
      }
    };

    checkUserRole();
  }, [user]);

  return { isPrimary, loading };
}
