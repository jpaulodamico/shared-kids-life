
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="py-16 bg-primary text-white px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Comece a simplificar sua coparentalidade hoje</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Crie sua conta gratuita agora e experimente uma nova forma de compartilhar a criação dos seus filhos.
        </p>
        <Link to="/auth">
          <Button size="lg" variant="secondary" className="text-primary">
            Criar conta gratuita
          </Button>
        </Link>
      </div>
    </section>
  );
};
