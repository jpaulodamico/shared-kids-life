
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./button";
import { LogOut } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export const FloatingLogout = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  
  // Hide on landing page, auth page, privacy policy and welcome page
  useEffect(() => {
    const publicPaths = ['/', '/auth', '/privacy-policy', '/welcome'];
    setIsVisible(user && !publicPaths.includes(location.pathname));
  }, [location, user]);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button 
        variant="outline" 
        size="sm" 
        className="rounded-full shadow-md bg-white hover:bg-gray-100 border-gray-200"
        onClick={signOut}
      >
        <LogOut size={16} />
        <span className="ml-1">Sair</span>
      </Button>
    </div>
  );
};
