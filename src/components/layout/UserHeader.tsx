
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useProfileData } from "@/hooks/use-profile-data";

export function UserHeader() {
  const { user, signOut } = useAuth();
  const { profileData, loading } = useProfileData();
  
  const displayName = profileData?.full_name || user?.email || "Usuário";
  
  const handleLogout = async () => {
    await signOut();
  };
  
  return (
    <div className="flex items-center justify-end gap-2 mb-4">
      <div className="flex items-center gap-2 p-2 bg-accent/50 rounded-md">
        <User className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">{displayName}</span>
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-1"
        onClick={handleLogout}
      >
        <LogOut className="h-4 w-4" />
        <span>Sair</span>
      </Button>
    </div>
  );
}
