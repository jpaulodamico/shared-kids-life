
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const useAuthHandlers = () => {
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
      }
    } catch (err) {
      console.error("Unexpected registration error:", err);
      toast.error("Erro ao criar conta", { description: "Tente novamente mais tarde." });
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
  };
};
