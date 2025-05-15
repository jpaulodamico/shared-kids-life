
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn, UserPlus } from "lucide-react";
import { useAuthHandlers } from "@/hooks/useAuthHandlers";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";

const AuthPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading } = useAuth();
  
  // Get tab from URL parameter or default to "login"
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tabParam === "register" ? "register" : "login");
  
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
  
  console.log("Auth page loaded. Active tab:", activeTab);
  
  // Update activeTab when search parameters change
  useEffect(() => {
    const newTab = searchParams.get("tab");
    if (newTab === "register" || newTab === "login") {
      console.log("Updating active tab to:", newTab);
      setActiveTab(newTab);
    }
  }, [searchParams]);
  
  // Redirect if user is already authenticated
  useEffect(() => {
    if (user && !loading) {
      console.log("User is authenticated, redirecting to /app");
      navigate("/app");
    }
  }, [user, loading, navigate]);

  // If loading, show spinner
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/50 p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">CoParent</h1>
          <p className="text-muted-foreground text-center">
            Gerencie a co-parentalidade de forma eficiente e colaborativa.
          </p>
        </div>
        
        <Card className="w-full">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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

        <div className="mt-6 text-center text-xs text-muted-foreground">
          Ao criar uma conta ou fazer login, você concorda com nossa{" "}
          <a href="/privacy-policy" className="text-primary hover:underline">
            Política de Privacidade
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
