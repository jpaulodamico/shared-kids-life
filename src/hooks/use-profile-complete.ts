
import { useProfileData } from "./use-profile-data";

export function useProfileComplete() {
  const { profileData, loading } = useProfileData();
  
  // Consideramos um perfil preenchido quando tem pelo menos nome e sobrenome
  const isProfileComplete = Boolean(
    profileData?.first_name && 
    profileData?.last_name
  );
  
  return { isProfileComplete, loading };
}
