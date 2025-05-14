
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { LoginForm } from "@/components/auth/LoginForm";

const AuthPage = () => {
  const navigate = useNavigate();
  const { signIn, signUp, signInWithGoogle, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");

  // Redirect to /app if already authenticated
  useEffect(() => {
    if (user) {
      // Verificar se é o primeiro acesso (welcome não foi mostrado)
      const welcomeShown = localStorage.getItem("welcomeShown") === "true";
      
      if (!welcomeShown) {
        navigate("/welcome");
      } else {
        navigate("/app");
      }
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log("Login attempt with token:", captchaToken ? "provided" : "not provided");
      
      if (!captchaToken) {
        toast.error("Por favor, complete a verificação do captcha");
        setIsLoading(false);
        return;
      }
      
      const { error } = await signIn(email, password, captchaToken);
      
      if (error) {
        console.error("Erro de login:", error);
        toast.error(`Falha no login: ${error.message}`);
      } else {
        toast.success("Login bem-sucedido!");
        
        // Verificar se o welcome já foi mostrado antes de redirecionar
        const welcomeShown = localStorage.getItem("welcomeShown") === "true";
        navigate(welcomeShown ? "/app" : "/welcome");
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
      toast.error("Ocorreu um erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log("Registration attempt with token:", captchaToken ? "provided" : "not provided");
      
      if (!captchaToken) {
        toast.error("Por favor, complete a verificação do captcha");
        setIsLoading(false);
        return;
      }
      
      const { error } = await signUp(email, password, captchaToken);
      
      if (error) {
        console.error("Erro de registro:", error);
        toast.error(`Falha no registro: ${error.message}`);
      } else {
        toast.success("Registro bem-sucedido! Verifique seu e-mail para confirmar o cadastro.");
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
      toast.error("Ocorreu um erro ao fazer registro");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await signInWithGoogle();
      
      if (error) {
        toast.error(`Falha no login com Google: ${error.message}`);
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
      toast.error("Ocorreu um erro ao fazer login com Google");
    }
  };

  const handleCaptchaVerify = (token: string) => {
    console.log("Captcha verificado:", token.substring(0, 10) + "...");
    setCaptchaToken(token);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/50 p-4">
      <div className="w-full max-w-md">
        <AuthHeader />
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Bem-vindo(a) ao CoParent</CardTitle>
            <CardDescription>
              Crie sua conta ou faça login para começar
            </CardDescription>
          </CardHeader>
          
          <Tabs defaultValue="register" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="register">Registrar</TabsTrigger>
              <TabsTrigger value="login">Login</TabsTrigger>
            </TabsList>
            
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
                captchaToken={captchaToken}
                setCaptchaToken={handleCaptchaVerify}
              />
            </TabsContent>
            
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
                captchaToken={captchaToken}
                setCaptchaToken={handleCaptchaVerify}
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
