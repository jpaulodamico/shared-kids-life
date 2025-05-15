
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface WelcomeHeaderProps {
  firstName: string;
  onSignOut: () => Promise<void>;
  onSkipToApp: () => void;
}

export function WelcomeHeader({ firstName, onSignOut, onSkipToApp }: WelcomeHeaderProps) {
  return (
    <div className="text-center relative">
      <div className="absolute top-0 right-0">
        <Button 
          variant="outline"
          size="sm"
          onClick={onSignOut}
          className="flex items-center gap-1"
        >
          <LogOut className="h-4 w-4" />
          <span>Sair</span>
        </Button>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Bem-vindo ao CoParent!</h1>
      <p className="text-muted-foreground text-lg">
        {firstName && `Olá ${firstName}, `}
        estamos felizes por você estar aqui! Vamos ajudá-lo a configurar tudo.
      </p>
      <Button 
        variant="outline" 
        size="sm" 
        className="mt-4"
        onClick={onSkipToApp}
      >
        Ir diretamente para o Dashboard
      </Button>
    </div>
  );
}
