
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { AuthFooter } from "@/components/auth/AuthFooter";
import { useAuthHandlers } from "@/hooks/useAuthHandlers";
import { LogIn, UserPlus } from "lucide-react";
import { useProfileData } from "@/hooks/use-profile-data";
import { toast } from "@/components/ui/use-toast";

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();
  const { profileData, loading: loadingProfile } = useProfileData();
  
  console.log("Auth page loaded. Location state:", location.state);
  
  // Get the active tab from location state or default to "login"
  const initialTab = location.state?.activeTab || "login";
  console.log("Initial tab set to:", initialTab);
  
  // Make sure we properly pick up the activeTab from location state
  const [activeTab, setActiveTab] = useState(initialTab);
  
  useEffect(() => {
    // Update activeTab when location.state changes
    if (location.state?.activeTab) {
      console.log("Setting active tab to:", location.state.activeTab);
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);
  
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    toggleShowPassword,
    isLoading,
    handleSignIn,
    handleSignUp,
    handleGoogleSignIn
  } = useAuthHandlers();

  // Redirect to /app if already authenticated, based on profile completion
  useEffect(() => {
    if (user && !loadingProfile) {
      console.log("User authenticated, checking profile status");
      const welcomeShown = localStorage.getItem("welcomeShown") === "true";
      const isProfileComplete = Boolean(profileData?.first_name && profileData?.last_name);
      
      console.log("Profile status:", { isProfileComplete, welcomeShown });
      
      if (isProfileComplete || welcomeShown) {
        console.log("Redirecting to /app");
        navigate("/app");
      } else {
        console.log("Redirecting to /welcome");
        navigate("/welcome");
      }
    }
  }, [user, loadingProfile, profileData, navigate]);

  // If loading, show spinner
  if (loading || loadingProfile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/50 p-4">
      <div className="w-full max-w-md">
        <AuthHeader />
        
        <Card className="w-full">
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="login" className="flex items-center gap-1">
                <LogIn className="h-4 w-4" />
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="flex items-center gap-1">
                <UserPlus className="h-4 w-4" />
                Registrar
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <LoginForm 
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                showPassword={showPassword}
                toggleShowPassword={toggleShowPassword}
                handleSignIn={handleSignIn}
                handleGoogleSignIn={handleGoogleSignIn}
                isLoading={isLoading}
              />
            </TabsContent>
            
            <TabsContent value="register">
              <RegisterForm 
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                showPassword={showPassword}
                toggleShowPassword={toggleShowPassword}
                handleSignUp={handleSignUp}
                handleGoogleSignIn={handleGoogleSignIn}
                isLoading={isLoading}
              />
            </TabsContent>
          </Tabs>
        </Card>

        <AuthFooter />
      </div>
    </div>
  );
};

export default AuthPage;
