
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
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

  // Redireciona para /app se já estiver autenticado
  useEffect(() => {
    if (user) {
      navigate("/app");
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!captchaToken) {
        toast({
          title: "Erro de verificação",
          description: "Por favor, complete a verificação do captcha",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
      
      console.log("Attempting login with captcha token:", captchaToken.substring(0, 10) + "...");
      const { error } = await signIn(email, password, captchaToken);
      
      if (error) {
        console.error("Erro de login:", error);
        toast({
          title: "Falha no login",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Login bem-sucedido!",
          variant: "success"
        });
        navigate("/app");
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
      toast({
        title: "Ocorreu um erro ao fazer login",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!captchaToken) {
        toast({
          title: "Erro de verificação",
          description: "Por favor, complete a verificação do captcha",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
      
      console.log("Attempting registration with captcha token:", captchaToken.substring(0, 10) + "...");
      const { error } = await signUp(email, password, captchaToken);
      
      if (error) {
        console.error("Erro de registro:", error);
        toast({
          title: "Falha no registro",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Registro bem-sucedido!",
          description: "Verifique seu e-mail para confirmar o cadastro.",
          variant: "success"
        });
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
      toast({
        title: "Ocorreu um erro ao fazer registro",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await signInWithGoogle();
      
      if (error) {
        toast({
          title: "Falha no login com Google",
          description: error.message,
          variant: "destructive"
        });
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
      toast({
        title: "Ocorreu um erro ao fazer login com Google",
        variant: "destructive"
      });
    }
  };

  const handleCaptchaVerify = (token: string) => {
    console.log("Captcha verified:", token.substring(0, 10) + "...");
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
