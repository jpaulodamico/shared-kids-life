
import { Calendar, DollarSign, FileText, MessageSquare } from "lucide-react";
import { useState } from "react";
import { StatCard } from "@/components/ui/stat-card";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { RecentMessages } from "@/components/dashboard/RecentMessages";
import { RecentExpenses } from "@/components/dashboard/RecentExpenses";
import { ChildProfiles } from "@/components/dashboard/ChildProfiles";
import { ChildSelector } from "@/components/dashboard/ChildSelector";

// Dados das crianças para o dashboard
const childrenData = [
  {
    id: "all",
    name: "Todas as crianças",
    events: 4,
    messages: 3,
    expenses: 2000,
    documents: 15,
    unreadMessages: 2,
    recentDocuments: 5
  },
  {
    id: "sofia",
    name: "Sofia Santos",
    events: 3,
    messages: 2,
    expenses: 1200,
    documents: 8,
    unreadMessages: 1,
    recentDocuments: 3
  },
  {
    id: "lucas",
    name: "Lucas Santos",
    events: 2,
    messages: 1,
    expenses: 800,
    documents: 7,
    unreadMessages: 1,
    recentDocuments: 2
  }
];

const Dashboard = () => {
  const [selectedChildId, setSelectedChildId] = useState("all");
  
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
          trend={{ value: 5, positive: false }}
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
