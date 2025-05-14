
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AuthPage = () => {
  const navigate = useNavigate();
  const { signInWithGoogle, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { error } = await signInWithGoogle();
      
      if (error) {
        console.error("Erro no login com Google:", error);
        toast.error(`Falha no login com Google: ${error.message}`);
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
      toast.error("Ocorreu um erro ao fazer login com Google");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { error } = await signInWithGoogle();
      
      if (error) {
        console.error("Erro no registro com Google:", error);
        toast.error(`Falha no registro com Google: ${error.message}`);
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
      toast.error("Ocorreu um erro ao registrar com Google");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      console.log("Attempting Google sign in from button");
      const { error } = await signInWithGoogle();
      
      if (error) {
        console.error("Erro no login com Google:", error);
        toast.error(`Falha no login com Google: ${error.message}`);
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
      toast.error("Ocorreu um erro ao fazer login com Google");
    } finally {
      setIsLoading(false);
    }
  };

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
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="register">Registrar</TabsTrigger>
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
