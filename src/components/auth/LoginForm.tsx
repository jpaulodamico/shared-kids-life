
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter } from "@/components/ui/card";
import { GoogleButton } from "./GoogleButton";
import { PasswordInput } from "./PasswordInput";
import { TurnstileCaptcha } from "./TurnstileCaptcha";

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
  captchaToken: string;
  setCaptchaToken: (token: string) => void;
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
  captchaToken,
  setCaptchaToken
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
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Senha
          </label>
          <PasswordInput
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showPassword={showPassword}
            toggleShowPassword={toggleShowPassword}
          />
        </div>

        <TurnstileCaptcha onVerify={setCaptchaToken} />
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full" type="submit" disabled={isLoading || !captchaToken}>
          {isLoading ? "Entrando..." : "Entrar"}
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
