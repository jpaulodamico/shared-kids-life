
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter } from "@/components/ui/card";
import { GoogleButton } from "./GoogleButton";
import { PasswordInput } from "./PasswordInput";
import { UserPlus } from "lucide-react";

interface RegisterFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  showPassword: boolean;
  toggleShowPassword: () => void;
  handleSignUp: (e: React.FormEvent) => Promise<void>;
  handleGoogleSignIn: () => Promise<void>;
  isLoading: boolean;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  toggleShowPassword,
  handleSignUp,
  handleGoogleSignIn,
  isLoading
}) => {
  return (
    <form onSubmit={handleSignUp}>
      <CardContent className="space-y-4 pt-4">
        <div className="space-y-2">
          <label htmlFor="register-email" className="text-sm font-medium">
            E-mail
          </label>
          <Input
            id="register-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
            disabled={isLoading}
            autoComplete="email"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="register-password" className="text-sm font-medium">
            Senha
          </label>
          <PasswordInput
            id="register-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showPassword={showPassword}
            toggleShowPassword={toggleShowPassword}
            minLength={6}
            disabled={isLoading}
          />
          <p className="text-xs text-muted-foreground">
            A senha deve ter pelo menos 6 caracteres
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Registrando...
            </>
          ) : (
            <>
              <UserPlus className="mr-2 h-4 w-4" />
              Criar Conta
            </>
          )}
        </Button>
        
        <div className="relative w-full flex items-center justify-center my-2">
          <hr className="w-full border-t border-gray-300" />
          <span className="absolute bg-white px-2 text-xs text-gray-500">ou</span>
        </div>
        
        <GoogleButton 
          onClick={handleGoogleSignIn}
          isLoading={isLoading}
          label="Registrar com o Google"
        />
      </CardFooter>
    </form>
  );
};
