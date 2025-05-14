
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="pt-6 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold mr-2">
            C<span className="text-accent">P</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">CoParent</h1>
        </div>
        <Link to="/auth">
          <Button variant="outline" className="hidden sm:inline-flex">
            Entrar
          </Button>
        </Link>
      </div>
    </header>
  );
};
