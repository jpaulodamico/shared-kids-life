
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

export interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  initials: string;
  first_name: string;
  last_name: string;
}

export function useProfileData() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    email: user?.email || "",
    phone: "",
    address: "",
    role: "parent",
    initials: "",
    first_name: "",
    last_name: ""
  });
  const [loading, setLoading] = useState(true);
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  // Buscar dados do perfil do usuário
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        if (data) {
          const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
          setProfileData({
            name: fullName || user.email?.split('@')[0] || "",
            email: data.email || user.email || "",
            phone: data.phone || "",
            address: data.address || "",
            role: "parent",
            initials: getInitials(fullName || user.email?.split('@')[0] || ""),
            first_name: data.first_name || "",
            last_name: data.last_name || ""
          });
        }
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfileData();
  }, [user]);
  
  const refreshProfileData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
          
      if (error) throw error;
      
      if (data) {
        const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
        setProfileData({
          name: fullName || user.email?.split('@')[0] || "",
          email: data.email || user.email || "",
          phone: data.phone || "",
          address: data.address || "",
          role: "parent",
          initials: getInitials(fullName || user.email?.split('@')[0] || ""),
          first_name: data.first_name || "",
          last_name: data.last_name || ""
        });
      }
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
    } finally {
      setLoading(false);
    }
  };
  
  return { profileData, loading, refreshProfileData };
}
