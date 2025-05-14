
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Child } from "@/types/children";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

// Hook para obter dados das crianças do Supabase
export const useChildren = () => {
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasData, setHasData] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchChildren = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Busca as crianças do usuário na tabela user_children
        const { data: userChildrenData, error: userChildrenError } = await supabase
          .from('user_children')
          .select('child_id')
          .eq('user_id', user.id);
          
        if (userChildrenError) {
          throw userChildrenError;
        }
        
        // Se não há crianças associadas ao usuário
        if (!userChildrenData || userChildrenData.length === 0) {
          setChildren([]);
          setHasData(false);
          setLoading(false);
          return;
        }
        
        // Extrai os IDs das crianças
        const childIds = userChildrenData.map(uc => uc.child_id);
        
        // Busca os dados completos das crianças
        const { data: childrenData, error: childrenError } = await supabase
          .from('children')
          .select('*')
          .in('id', childIds);
          
        if (childrenError) {
          throw childrenError;
        }
        
        // Mapeia os dados para o formato esperado pela aplicação
        const formattedChildren = childrenData.map(child => ({
          id: child.id,
          name: child.name,
          age: child.age,
          birthday: child.birthday,
          gender: child.gender,
          school: child.school,
          grade: child.grade,
          teacher: child.teacher,
          bloodType: child.blood_type,
          allergies: child.allergies || [],
          medications: child.medications || [],
          height: child.height,
          weight: child.weight,
          lastCheckup: child.last_checkup,
          activities: child.activities || [],
          imageUrl: child.image_url,
          initials: child.initials || child.name.split(' ').map(part => part[0]).join('')
        }));
        
        setChildren(formattedChildren);
        setHasData(formattedChildren.length > 0);
        setError(null);
      } catch (err) {
        console.error('Error fetching children:', err);
        setError('Erro ao buscar dados das crianças');
        setChildren([]);
        setHasData(false);
      } finally {
        setLoading(false);
      }
    };

    fetchChildren();
  }, [user]);

  return { children, loading, error, hasData };
};

// Hook para obter dados de uma criança específica
export function useChildById(childId: string | null) {
  const [child, setChild] = useState<Child | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    if (!user || !childId) {
      setLoading(false);
      return;
    }
    
    async function fetchChild() {
      try {
        setLoading(true);
        
        // Verifica se o usuário tem acesso a esta criança
        const { data: relation, error: relationError } = await supabase
          .from('user_children')
          .select('*')
          .eq('user_id', user.id)
          .eq('child_id', childId)
          .single();
        
        if (relationError || !relation) {
          setChild(null);
          setLoading(false);
          return;
        }
        
        // Busca os detalhes da criança
        const { data, error } = await supabase
          .from('children')
          .select('*')
          .eq('id', childId)
          .single();
          
        if (error || !data) {
          throw error;
        }
        
        // Mapeia para o formato esperado
        const formattedChild: Child = {
          id: data.id,
          name: data.name,
          age: data.age,
          birthday: data.birthday,
          school: data.school,
          grade: data.grade,
          teacher: data.teacher,
          bloodType: data.blood_type,
          allergies: data.allergies || [],
          medications: data.medications || [],
          height: data.height,
          weight: data.weight,
          lastCheckup: data.last_checkup,
          activities: data.activities || [],
          imageUrl: data.image_url,
          initials: data.initials,
          gender: data.gender as 'male' | 'female',
        };
        
        setChild(formattedChild);
      } catch (error) {
        console.error('Erro ao buscar criança:', error);
        toast.error('Não foi possível carregar os dados da criança');
        setChild(null);
      } finally {
        setLoading(false);
      }
    }
    
    fetchChild();
  }, [user, childId]);
  
  return { child, loading };
}
