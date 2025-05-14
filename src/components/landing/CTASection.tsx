
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AppTitle } from "@/components/ui/app-title";

export const CTASection = () => {
  return (
    <section className="py-16 bg-primary text-white px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto text-center">
        <div className="flex justify-center mb-6">
          <img 
            src="/lovable-uploads/d45e8800-b655-4bbb-b6f1-a16187642158.png" 
            alt="CoParent Logo" 
            className="h-14 w-auto"
          />
        </div>
        <h2 className="text-3xl font-bold mb-6">Comece a simplificar sua coparentalidade hoje</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Crie sua conta gratuita agora e experimente uma nova forma de compartilhar a criação dos seus filhos.
        </p>
        <Link to="/auth">
          <Button size="lg" variant="accent" className="text-accent-foreground font-semibold shadow-lg hover:scale-105 transition-transform">
            Criar conta gratuita
          </Button>
        </Link>
      </div>
    </section>
  );
};
