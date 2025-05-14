
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { GoogleButton } from "@/components/auth/GoogleButton";

const AuthPage = () => {
  const navigate = useNavigate();
  const { signInWithGoogle, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

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

  const handleGoogleSignIn = async () => {
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
          
          <CardContent className="flex flex-col items-center py-6">
            <p className="text-center text-muted-foreground mb-6">
              Use sua conta Google para acessar o CoParent de forma rápida e segura
            </p>
            
            <GoogleButton 
              onClick={handleGoogleSignIn}
              isLoading={isLoading}
              label="Continuar com o Google"
            />
          </CardContent>
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
