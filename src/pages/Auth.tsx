
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { LogIn, UserPlus } from "lucide-react";

const AuthPage = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  // Redirect to /app if already authenticated, only if the welcome screen was already shown
  useEffect(() => {
    if (user) {
      const welcomeShown = localStorage.getItem("welcomeShown") === "true";
      
      if (welcomeShown) {
        navigate("/app");
      } else {
        navigate("/welcome");
      }
    }
  }, [user, navigate]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      console.log("Attempting Google sign in from button");
      const { error } = await useAuth().signInWithGoogle();
      
      if (error) {
        console.error("Erro no login com Google:", error);
        toast.error(`Falha no login com Google: ${error.message}`);
      }
      // Se não houver erro, a redireção para o Google será acionada automaticamente
    } catch (err) {
      console.error("Erro inesperado:", err);
      toast.error("Ocorreu um erro ao fazer login com Google");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { error } = await useAuth().signIn(email, password);
      
      if (error) {
        console.error("Login error:", error);
        toast.error("Falha no login: " + error.message);
      }
    } catch (err) {
      console.error("Unexpected login error:", err);
      toast.error("Erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { error } = await useAuth().signUp(email, password);
      
      if (error) {
        console.error("Registration error:", error);
        toast.error("Falha no registro: " + error.message);
      } else {
        toast.success("Conta criada com sucesso! Faça login para continuar.");
        setActiveTab("login");
      }
    } catch (err) {
      console.error("Unexpected registration error:", err);
      toast.error("Erro ao criar conta");
    } finally {
      setIsLoading(false);
    }
  };

  // Se estiver carregando, mostra spinner
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
        <AuthHeader />
        
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle>Bem-vindo(a) ao CoParent</CardTitle>
            <CardDescription>
              Entre ou crie sua conta para começar
            </CardDescription>
          </CardHeader>
          
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
          <Link to="/privacy-policy" className="text-primary hover:underline">
            Política de Privacidade
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
