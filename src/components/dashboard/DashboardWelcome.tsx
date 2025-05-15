
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUserRole } from "@/hooks/use-user-role";

interface DashboardWelcomeProps {
  isPrimary: boolean;
}

export const DashboardWelcome = ({ isPrimary }: DashboardWelcomeProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-muted/40 rounded-lg p-8 text-center space-y-6">
      <h2 className="text-xl font-semibold">Primeiros passos para iniciar sua experiência</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="flex flex-col items-center p-4 bg-background rounded-lg shadow-sm">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
            1
          </div>
          <h3 className="font-medium mb-2">Complete seu perfil</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Adicione suas informações pessoais para facilitar a identificação
          </p>
          <Button onClick={() => navigate("/app/profile")} variant="outline" className="mt-auto">
            Ir para Perfil
          </Button>
        </div>
        
        {isPrimary && (
          <>
            <div className="flex flex-col items-center p-4 bg-background rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="font-medium mb-2">Adicione crianças</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Cadastre os perfis das crianças com informações importantes
              </p>
              <Button onClick={() => navigate("/app/children")} variant="outline" className="mt-auto">
                Adicionar Crianças
              </Button>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-background rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="font-medium mb-2">Convide responsáveis</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Convide outros pais ou responsáveis para compartilhar o gerenciamento
              </p>
              <Button onClick={() => navigate("/app/profile")} variant="outline" className="mt-auto">
                Convidar Pessoas
              </Button>
            </div>
          </>
        )}
        
        {!isPrimary && (
          <div className="flex flex-col items-center p-4 bg-background rounded-lg shadow-sm md:col-span-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
              2
            </div>
            <h3 className="font-medium mb-2">Aguarde convite para crianças</h3>
            <p className="text-sm text-muted-foreground mb-4">
              O responsável principal precisa vincular você a uma criança para que você tenha acesso completo
            </p>
            <Button onClick={() => navigate("/app/guardians")} variant="outline" className="mt-auto">
              Ver Responsáveis
            </Button>
          </div>
        )}
      </div>
      
      {isPrimary && (
        <div className="pt-4">
          <Button onClick={() => navigate("/welcome")} className="mr-4">
            Ver tutorial novamente
          </Button>
        </div>
      )}
    </div>
  );
};
