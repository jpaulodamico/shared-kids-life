
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="pt-6 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex justify-between items-center">
        <div></div>
        <div className="flex gap-3">
          <Link to="/auth">
            <Button variant="primary" className="hidden sm:inline-flex shadow-md hover:shadow-lg transition-shadow">
              Entrar
            </Button>
          </Link>
          <Link to="/auth">
            <Button variant="accent" className="hidden sm:inline-flex shadow-md hover:shadow-lg transition-shadow font-medium">
              Criar conta gratuita
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
