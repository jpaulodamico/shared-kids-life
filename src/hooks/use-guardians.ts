
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export type Guardian = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  isPrimary: boolean;
  initials: string;
};

export function useGuardians() {
  const [guardians, setGuardians] = useState<Guardian[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchGuardians = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Step 1: First find all children associated with the current user
        const { data: userChildrenData, error: userChildrenError } = await supabase
          .from('user_children')
          .select('child_id')
          .eq('user_id', user.id);
          
        if (userChildrenError) {
          throw userChildrenError;
        }
        
        if (!userChildrenData || userChildrenData.length === 0) {
          setGuardians([]);
          setLoading(false);
          return;
        }
        
        // Step 2: Extract child IDs
        const childIds = userChildrenData.map(uc => uc.child_id);
        
        // Step 3: Find all users associated with these children
        const { data: guardianUsers, error: guardiansError } = await supabase
          .from('user_children')
          .select('user_id')
          .in('child_id', childIds);
          
        if (guardiansError) {
          throw guardiansError;
        }
        
        // Step 4: Extract unique user IDs
        const userIds = [...new Set(guardianUsers.map(gu => gu.user_id))];
        
        // Step 5: Get profile data for these users
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('*')
          .in('id', userIds);
          
        if (profilesError) {
          throw profilesError;
        }

        // Step 6: Get role data (primary or not)
        const { data: rolesData, error: rolesError } = await supabase
          .from('user_roles')
          .select('*')
          .in('user_id', userIds);
          
        if (rolesError) {
          throw rolesError;
        }
        
        // Step 7: Combine profiles and roles data
        const guardiansData = profilesData.map(profile => {
          const role = rolesData.find(r => r.user_id === profile.id);
          const isPrimary = role?.is_primary || false;
          
          // Generate initials from name
          const firstName = profile.first_name || '';
          const lastName = profile.last_name || '';
          const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || profile.email?.substr(0, 2).toUpperCase() || 'US';
          
          return {
            id: profile.id,
            email: profile.email,
            first_name: profile.first_name,
            last_name: profile.last_name,
            phone: profile.phone,
            avatar_url: profile.avatar_url,
            isPrimary,
            initials
          };
        });
        
        setGuardians(guardiansData);
      } catch (error) {
        console.error('Error fetching guardians:', error);
        toast.error('Erro ao buscar dados dos responsáveis');
      } finally {
        setLoading(false);
      }
    };

    fetchGuardians();
  }, [user]);

  return { guardians, loading };
}
