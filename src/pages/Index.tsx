
import { Calendar, DollarSign, FileText, MessageSquare } from "lucide-react";
import { useState } from "react";
import { StatCard } from "@/components/ui/stat-card";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { RecentMessages } from "@/components/dashboard/RecentMessages";
import { RecentExpenses } from "@/components/dashboard/RecentExpenses";
import { ChildProfiles } from "@/components/dashboard/ChildProfiles";
import { ChildSelector } from "@/components/dashboard/ChildSelector";
import { useChildren } from "@/hooks/use-supabase-data";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [selectedChildId, setSelectedChildId] = useState("all");
  const navigate = useNavigate();
  const { children, loading, hasData } = useChildren();
  
  // Se não há crianças cadastradas, mostra uma mensagem orientando o usuário
  if (!loading && !hasData) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Bem-vindo ao CoParent</h1>
          <p className="text-muted-foreground">
            Parece que você ainda não configurou nenhuma criança. Vamos começar!
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
          </div>
          
          <div className="pt-4">
            <Button onClick={() => navigate("/welcome")} className="mr-4">
              Ver tutorial novamente
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Dados básicos para o dashboard quando não há dados reais
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
          value={selectedChild.events.toString()} 
          description="Esta semana" 
          icon={<Calendar />}
          className="bg-gradient-to-br from-family-50 to-family-100 border-family-200"
        />
        <StatCard 
          title="Mensagens" 
          value={selectedChild.messages.toString()} 
          description={`${selectedChild.unreadMessages} não lidas`} 
          icon={<MessageSquare />}
          className="bg-gradient-to-br from-accent-green-50 to-accent-green-100 border-accent-green-200"
        />
        <StatCard 
          title="Despesas" 
          value={`R$ ${selectedChild.expenses.toLocaleString('pt-BR')},00`} 
          description="Este mês" 
          icon={<DollarSign />}
          className="bg-gradient-to-br from-warm-50 to-warm-100 border-warm-200"
        />
        <StatCard 
          title="Documentos" 
          value={selectedChild.documents.toString()} 
          description={`${selectedChild.recentDocuments} adicionados recentemente`} 
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
