
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    console.log("Login button clicked, navigating to /auth?tab=login");
    navigate("/auth?tab=login");
  };

  const handleSignupClick = () => {
    console.log("Signup button clicked, navigating to /auth?tab=register");
    navigate("/auth?tab=register");
  };

  return (
    <header className="pt-6 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/fb531f28-1e20-42cf-a02f-979780af1d34.png" 
            alt="CoParent Logo" 
            className="h-10 w-auto"
          />
        </div>
        <div className="flex gap-3">
          <Button 
            variant="primary" 
            className="hidden sm:inline-flex shadow-md hover:shadow-lg transition-shadow"
            onClick={handleLoginClick}
          >
            Entrar
          </Button>
          <Button 
            variant="accent" 
            className="hidden sm:inline-flex shadow-md hover:shadow-lg transition-shadow font-medium"
            onClick={handleSignupClick}
          >
            Criar conta gratuita
          </Button>
        </div>
      </div>
    </header>
  );
};
