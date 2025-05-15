
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

export function useProfileComplete() {
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const checkProfileComplete = async () => {
      if (!user) {
        setIsProfileComplete(false);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error checking profile completion:', error);
          setIsProfileComplete(false);
        } else {
          // Profile is considered complete if at least first_name is filled
          const complete = !!data && !!data.first_name;
          console.log('Profile completion check:', { data, complete });
          setIsProfileComplete(complete);
        }
      } catch (error) {
        console.error('Error in useProfileComplete:', error);
        setIsProfileComplete(false);
      } finally {
        setLoading(false);
      }
    };

    checkProfileComplete();
  }, [user]);

  return { isProfileComplete, loading };
}
