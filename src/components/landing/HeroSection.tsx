
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export const HeroSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Simplifique a <span className="text-primary">coparentalidade</span> e foque no que mais importa
            </h1>
            <p className="text-xl text-gray-600">
              Gerencie em conjunto a vida dos seus filhos com tranquilidade, transparência e organização, mesmo à distância.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/auth">
                <Button size="lg" className="w-full sm:w-auto">
                  Começar agora
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Saber mais
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <img
                src="/lovable-uploads/b41d8956-1193-466a-b9b6-45248c715078.png"
                alt="CoParent aplicativo em smartphones"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
