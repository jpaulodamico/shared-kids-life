
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter } from "@/components/ui/card";
import { GoogleButton } from "./GoogleButton";
import { PasswordInput } from "./PasswordInput";
import { LogIn } from "lucide-react";

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  showPassword: boolean;
  toggleShowPassword: () => void;
  handleSignIn: (e: React.FormEvent) => Promise<void>;
  handleGoogleSignIn: () => Promise<void>;
  isLoading: boolean;
  onForgotPassword: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  toggleShowPassword,
  handleSignIn,
  handleGoogleSignIn,
  isLoading,
  onForgotPassword
}) => {
  return (
    <form onSubmit={handleSignIn}>
      <CardContent className="space-y-4 pt-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            E-mail
          </label>
          <Input
            id="email"
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
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium">
              Senha
            </label>
            <Button 
              variant="link" 
              className="p-0 h-auto text-xs" 
              type="button"
              onClick={onForgotPassword}
            >
              Esqueceu a senha?
            </Button>
          </div>
          <PasswordInput
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showPassword={showPassword}
            toggleShowPassword={toggleShowPassword}
            disabled={isLoading}
          />
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Entrando...
            </>
          ) : (
            <>
              <LogIn className="mr-2 h-4 w-4" />
              Entrar
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
          label="Fazer login com o Google"
        />
      </CardFooter>
    </form>
  );
};
