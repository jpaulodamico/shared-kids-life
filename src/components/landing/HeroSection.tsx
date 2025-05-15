
import React from "react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { AppTitle } from "@/components/ui/app-title";

export const HeroSection = () => {
  const handleGetStarted = () => {
    console.log("Get started button clicked, navigating to /auth");
    window.location.href = "/auth?tab=register";
  };
  
  const handleLearnMore = () => {
    console.log("Learn more button clicked, navigating to /auth");
    window.location.href = "/auth?tab=login";
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="md:w-1/2 space-y-6">
            <div className="flex items-center mb-6">
              <img 
                src="/lovable-uploads/fb531f28-1e20-42cf-a02f-979780af1d34.png" 
                alt="CoParent Logo" 
                className="h-20 w-auto mr-4"
              />
              <AppTitle size="xl">
                CoParent
              </AppTitle>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Simplifique a <span className="text-primary">coparentalidade</span> e foque no que mais importa
            </h2>
            <p className="text-xl text-gray-600">
              Gerencie em conjunto a vida dos seus filhos com tranquilidade, transparência e organização, mesmo à distância.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="w-full sm:w-auto" onClick={handleGetStarted}>
                Começar agora
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto" onClick={handleLearnMore}>
                Saber mais
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <img
                src="/lovable-uploads/6e8739c6-21c3-460c-9dd9-758d2299401a.png"
                alt="Calendário de coparentalidade"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
