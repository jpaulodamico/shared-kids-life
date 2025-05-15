
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const CTASection = () => {
  const navigate = useNavigate();
  
  const handleCreateAccount = () => {
    console.log("Create account button clicked");
    navigate("/auth?tab=register");
  };

  return (
    <section className="py-16 bg-primary text-white px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto text-center">
        <div className="flex justify-center mb-6">
          <img 
            src="/lovable-uploads/fb531f28-1e20-42cf-a02f-979780af1d34.png" 
            alt="CoParent Logo" 
            className="h-14 w-auto"
          />
        </div>
        <h2 className="text-3xl font-bold mb-6">Comece a simplificar sua coparentalidade hoje</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Crie sua conta gratuita agora e experimente uma nova forma de compartilhar a criação dos seus filhos.
        </p>
        <Button 
          size="lg" 
          variant="accent" 
          className="text-accent-foreground font-semibold shadow-lg hover:scale-105 transition-transform"
          onClick={handleCreateAccount}
        >
          Criar conta gratuita
        </Button>
      </div>
    </section>
  );
};
