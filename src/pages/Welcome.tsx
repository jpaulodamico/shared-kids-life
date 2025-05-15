
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useProfileComplete } from "@/hooks/use-profile-complete";
import { useUserRole } from "@/hooks/use-user-role";
import { WelcomeHeader } from "@/components/welcome/WelcomeHeader";
import { FeaturesContent } from "@/components/welcome/FeaturesContent";
import { GettingStartedContent } from "@/components/welcome/GettingStartedContent";

const WelcomePage = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { isProfileComplete } = useProfileComplete();
  const { isPrimary } = useUserRole();
  const [activeTab, setActiveTab] = useState("features");
  
  // Redirect unauthenticated users to login page
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);
  
  // Redirect users with complete profiles to dashboard if they've seen welcome
  useEffect(() => {
    if (isProfileComplete && localStorage.getItem("welcomeShown")) {
      navigate("/app");
    }
  }, [isProfileComplete, navigate]);

  const handleContinue = () => {
    // Save that the user has seen the welcome screen
    localStorage.setItem("welcomeShown", "true");
    
    toast.success("Bem-vindo ao CoParent!", {
      description: "Agora você pode começar a usar todas as funcionalidades do aplicativo."
    });
    
    // Navigate to the main dashboard
    navigate("/app");
  };
  
  const skipToApp = () => {
    // Save that the user has seen the welcome screen
    localStorage.setItem("welcomeShown", "true");
    
    toast.info("Você pode acessar as instruções novamente pelo seu perfil", {
      description: "Recomendamos completar seu perfil para uma experiência completa."
    });
    
    // Navigate to the main dashboard
    navigate("/app");
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  // Get user's first name from email
  const firstName = user?.email ? user.email.split('@')[0] : '';

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8 bg-muted/30">
      <div className="max-w-4xl w-full space-y-8">
        <WelcomeHeader 
          firstName={firstName}
          onSignOut={handleSignOut}
          onSkipToApp={skipToApp}
        />
        
        <Tabs defaultValue="features" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="features">Funcionalidades</TabsTrigger>
            <TabsTrigger value="getting-started">Primeiros Passos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features" className="mt-6 space-y-6">
            <FeaturesContent />
          </TabsContent>
          
          <TabsContent value="getting-started" className="mt-6">
            <GettingStartedContent 
              isPrimary={isPrimary}
              onBack={() => setActiveTab("features")}
              onContinue={handleContinue}
            />
          </TabsContent>
        </Tabs>

        {activeTab === "features" && (
          <div className="flex justify-center pt-6">
            <Button onClick={() => setActiveTab("getting-started")} size="lg" className="cursor-pointer">
              Próximo: Primeiros Passos
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomePage;
