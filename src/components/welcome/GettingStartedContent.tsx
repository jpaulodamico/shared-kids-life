
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Users, UserPlus, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface GettingStartedContentProps {
  isPrimary: boolean | null;
  onBack: () => void;
  onContinue: () => void;
}

export function GettingStartedContent({ isPrimary, onBack, onContinue }: GettingStartedContentProps) {
  const navigate = useNavigate();
  
  // Define navigation handlers for each button
  const handleProfileClick = () => {
    console.log("Navigating to profile page");
    navigate("/app/profile");
  };

  const handleChildrenClick = () => {
    console.log("Navigating to children page");
    navigate("/app/children");
  };

  const handleInviteClick = () => {
    console.log("Navigating to profile page for invitations");
    navigate("/app/profile");
  };

  const handleCalendarClick = () => {
    console.log("Navigating to calendar page");
    navigate("/app/calendar");
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Primeiros Passos</CardTitle>
        <CardDescription>
          Siga estas etapas para configurar sua experiência no CoParent
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
              1
            </div>
            <div>
              <h3 className="font-medium text-lg">Complete seu perfil</h3>
              <p className="text-muted-foreground">
                Adicione suas informações pessoais e uma foto de perfil. Isso ajudará os outros responsáveis a identificá-lo.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={handleProfileClick}
              >
                <User className="h-4 w-4 mr-2" />
                Ir para Perfil
              </Button>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
              2
            </div>
            <div>
              <h3 className="font-medium text-lg">Adicione sua(s) criança(s)</h3>
              <p className="text-muted-foreground">
                Adicione informações sobre suas crianças, incluindo dados escolares, de saúde e de atividades.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={handleChildrenClick}
              >
                <Users className="h-4 w-4 mr-2" />
                Adicionar Crianças
              </Button>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
              3
            </div>
            <div>
              <h3 className="font-medium text-lg">Convide outros responsáveis</h3>
              <p className="text-muted-foreground">
                Convide outros responsáveis (outro pai/mãe, avós, babás, etc.) para compartilhar o acesso às informações das crianças. 
                {isPrimary && <span className="font-medium"> Você pode convidar até 5 responsáveis.</span>}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={handleInviteClick}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Convidar Responsáveis
              </Button>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
              4
            </div>
            <div>
              <h3 className="font-medium text-lg">Configure o calendário</h3>
              <p className="text-muted-foreground">
                Adicione eventos importantes como consultas médicas, atividades escolares, aniversários e compromissos.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={handleCalendarClick}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Ir para Calendário
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={onBack}
        >
          Voltar para Funcionalidades
        </Button>
        <Button onClick={onContinue}>
          Continuar para o Dashboard
        </Button>
      </CardFooter>
    </Card>
  );
}
