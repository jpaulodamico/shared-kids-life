
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Child } from '@/types/children';
import { toast } from 'sonner';

export function useChildren() {
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    
    async function fetchChildren() {
      try {
        setLoading(true);
        
        // Busca as crianças associadas ao usuário através da tabela user_children
        const { data: userChildren, error: relationError } = await supabase
          .from('user_children')
          .select('child_id')
          .eq('user_id', user.id);
        
        if (relationError) {
          throw relationError;
        }
        
        if (!userChildren || userChildren.length === 0) {
          setChildren([]);
          setLoading(false);
          return;
        }
        
        const childIds = userChildren.map(relation => relation.child_id);
        
        // Busca os detalhes das crianças
        const { data, error } = await supabase
          .from('children')
          .select('*')
          .in('id', childIds);
          
        if (error) {
          throw error;
        }
        
        // Mapeia os dados para o formato esperado pela aplicação
        const formattedChildren = data.map(child => ({
          id: child.id,
          name: child.name,
          age: child.age,
          birthday: child.birthday,
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
          initials: child.initials,
          gender: child.gender as 'male' | 'female',
        }));
        
        setChildren(formattedChildren);
      } catch (error) {
        console.error('Erro ao buscar crianças:', error);
        toast.error('Não foi possível carregar os dados das crianças');
      } finally {
        setLoading(false);
      }
    }
    
    fetchChildren();
  }, [user]);
  
  return { children, loading };
}

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
