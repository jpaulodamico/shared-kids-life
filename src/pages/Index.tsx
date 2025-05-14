
import { Calendar, DollarSign, FileText, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { StatCard } from "@/components/ui/stat-card";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { RecentMessages } from "@/components/dashboard/RecentMessages";
import { RecentExpenses } from "@/components/dashboard/RecentExpenses";
import { ChildProfiles } from "@/components/dashboard/ChildProfiles";
import { ChildSelector } from "@/components/dashboard/ChildSelector";
import { useChildren } from "@/hooks/use-supabase-data";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "@/hooks/use-user-role";
import { toast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const [selectedChildId, setSelectedChildId] = useState("all");
  const navigate = useNavigate();
  const { children, loading, hasData } = useChildren();
  const { user } = useAuth();
  const { isPrimary, loading: roleLoading } = useUserRole();
  
  useEffect(() => {
    // Show a notification to invited users when they first load the dashboard
    if (!roleLoading && !isPrimary && user) {
      toast("Você está acessando como responsável convidado. Algumas funcionalidades podem estar limitadas.");
    }
  }, [roleLoading, isPrimary, user]);
  
  // Se está carregando, mostra um loading state
  if (loading || roleLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  // Se não há crianças cadastradas, mostra uma mensagem orientando o usuário
  if (!hasData) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Bem-vindo ao CoParent</h1>
          <p className="text-muted-foreground">
            {isPrimary 
              ? "Parece que você ainda não configurou nenhuma criança. Vamos começar!"
              : "Você foi convidado como responsável, mas não há crianças vinculadas a você ainda."}
          </p>
        </div>
        
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
      </div>
    );
  }

  // Dados básicos para o dashboard - sem dados de teste
  const emptyChildData = {
    id: "all",
    name: "Todas as crianças",
    events: 0,
    messages: 0,
    expenses: 0,
    documents: 0,
    unreadMessages: 0,
    recentDocuments: 0
  };

  // Childrendata atualizado para o dashboard - sem dados de teste
  const childrenData = children.length > 0 
    ? [
        emptyChildData,
        ...children.map(child => ({
          id: String(child.id),
          name: child.name,
          events: 0,
          messages: 0,
          expenses: 0,
          documents: 0,
          unreadMessages: 0,
          recentDocuments: 0
        }))
      ]
    : [emptyChildData];
  
  // Encontra os dados da criança selecionada
  const selectedChild = childrenData.find(child => child.id === selectedChildId) || childrenData[0];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold">Bem-vindo ao CoParent</h1>
          <ChildSelector 
            selectedChildId={selectedChildId} 
            onSelectChild={setSelectedChildId}
            children={childrenData}
          />
        </div>
        <p className="text-muted-foreground">
          {selectedChildId === "all" 
            ? "Gerencie a vida compartilhada das crianças de forma simples e organizada" 
            : `Visualizando informações de ${selectedChild.name}`}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Próximos Eventos" 
          value="0" 
          description="Esta semana" 
          icon={<Calendar />}
          className="bg-gradient-to-br from-family-50 to-family-100 border-family-200"
        />
        <StatCard 
          title="Mensagens" 
          value="0" 
          description="0 não lidas" 
          icon={<MessageSquare />}
          className="bg-gradient-to-br from-accent-green-50 to-accent-green-100 border-accent-green-200"
        />
        <StatCard 
          title="Despesas" 
          value="R$ 0,00" 
          description="Este mês" 
          icon={<DollarSign />}
          className="bg-gradient-to-br from-warm-50 to-warm-100 border-warm-200"
        />
        <StatCard 
          title="Documentos" 
          value="0" 
          description="0 adicionados recentemente" 
          icon={<FileText />}
          className="bg-gradient-to-br from-muted to-muted/70 border-muted/90"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingEvents selectedChildId={selectedChildId} />
        <RecentMessages selectedChildId={selectedChildId} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentExpenses selectedChildId={selectedChildId} />
        <ChildProfiles selectedChildId={selectedChildId} />
      </div>
    </div>
  );
};

export default Dashboard;
