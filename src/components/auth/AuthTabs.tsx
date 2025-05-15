
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn, UserPlus } from "lucide-react";
import { useAuthHandlers } from "@/hooks/useAuthHandlers";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { PasswordResetForm } from "@/components/auth/PasswordResetForm";

interface AuthTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const AuthTabs: React.FC<AuthTabsProps> = ({ activeTab, setActiveTab }) => {
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  
  const {
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
  } = useAuthHandlers();
  
  const handleShowPasswordReset = () => {
    setShowPasswordReset(true);
  };
  
  const handleBackToLogin = () => {
    setShowPasswordReset(false);
    setActiveTab("login");
  };
  
  return (
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
        {showPasswordReset ? (
          <PasswordResetForm onBack={handleBackToLogin} />
        ) : (
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
            onForgotPassword={handleShowPasswordReset}
          />
        )}
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
  );
};
