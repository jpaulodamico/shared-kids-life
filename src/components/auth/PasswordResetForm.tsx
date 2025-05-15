
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface PasswordResetFormProps {
  onBack: () => void;
}

export const PasswordResetForm: React.FC<PasswordResetFormProps> = ({ onBack }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("E-mail necessário", {
        description: "Digite seu endereço de e-mail para redefinir sua senha."
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Use a função de redefinição de senha do Supabase
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + "/auth?tab=reset",
      });
      
      if (error) {
        console.error("Erro ao enviar e-mail de redefinição:", error);
        toast.error("Erro ao redefinir senha", {
          description: "Não foi possível enviar o e-mail de redefinição. Verifique se o e-mail está correto."
        });
      } else {
        setResetSent(true);
        toast.success("E-mail enviado", {
          description: "Verifique sua caixa de entrada para instruções de redefinição de senha."
        });
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
      toast.error("Erro interno", {
        description: "Ocorreu um erro ao processar sua solicitação."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleResetPassword}>
      <CardContent className="space-y-4 pt-4">
        {resetSent ? (
          <div className="p-4 bg-muted rounded-lg text-center space-y-3">
            <AlertCircle className="mx-auto h-10 w-10 text-primary" />
            <h3 className="font-semibold text-lg">E-mail enviado</h3>
            <p className="text-sm text-muted-foreground">
              Enviamos um link para redefinir sua senha para {email}.
              Verifique sua caixa de entrada e siga as instruções no e-mail.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-center">Recuperar senha</h3>
              <p className="text-sm text-muted-foreground text-center">
                Digite seu e-mail abaixo e enviaremos um link para redefinir sua senha.
              </p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="reset-email" className="text-sm font-medium">
                E-mail
              </label>
              <Input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                disabled={isLoading}
                autoComplete="email"
                className="w-full"
              />
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-2">
        {!resetSent ? (
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Enviando...
              </>
            ) : (
              "Enviar link de recuperação"
            )}
          </Button>
        ) : null}
        
        <Button 
          variant="outline" 
          type="button" 
          className="w-full" 
          onClick={onBack}
        >
          {resetSent ? "Voltar para o login" : "Cancelar"}
        </Button>
      </CardFooter>
    </form>
  );
};
