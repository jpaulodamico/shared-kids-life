
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { LogIn, UserPlus } from "lucide-react";

const AuthPage = () => {
  const navigate = useNavigate();
  const { user, loading, signIn, signUp, signInWithGoogle } = useAuth();
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
      const { error } = await signInWithGoogle();
      
      if (error) {
        console.error("Erro no login com Google:", error);
        toast.error(`Falha no login com Google: ${error.message}`);
      }
      // If there's no error, the redirect to Google will be triggered automatically
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
      
      if (!email || !password) {
        toast.error("Dados incompletos", { description: "Preencha email e senha para continuar." });
        return;
      }
      
      const { error } = await signIn(email, password);
      
      if (error) {
        console.error("Login error:", error);
        let errorMessage = "Erro ao fazer login";
        
        if (error.message.includes("Invalid login credentials")) {
          errorMessage = "Email ou senha incorretos";
        } else if (error.message.includes("Email not confirmed")) {
          errorMessage = "Email não confirmado. Verifique sua caixa de entrada.";
        }
        
        toast.error("Falha no login", { description: errorMessage });
      }
    } catch (err) {
      console.error("Unexpected login error:", err);
      toast.error("Erro ao fazer login", { description: "Tente novamente mais tarde." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      if (!email || !password) {
        toast.error("Dados incompletos", { description: "Preencha email e senha para continuar." });
        return;
      }
      
      if (password.length < 6) {
        toast.error("Senha muito curta", { description: "A senha deve ter pelo menos 6 caracteres." });
        return;
      }
      
      const { error } = await signUp(email, password);
      
      if (error) {
        console.error("Registration error:", error);
        let errorMessage = error.message;
        
        if (error.message.includes("already registered")) {
          errorMessage = "Este email já está em uso.";
        }
        
        toast.error("Falha no registro", { description: errorMessage });
      } else {
        toast.success("Conta criada com sucesso!", { 
          description: "Verifique seu email para confirmação ou faça login para continuar." 
        });
        setActiveTab("login");
      }
    } catch (err) {
      console.error("Unexpected registration error:", err);
      toast.error("Erro ao criar conta", { description: "Tente novamente mais tarde." });
    } finally {
      setIsLoading(false);
    }
  };

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
