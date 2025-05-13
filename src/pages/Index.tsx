
import { Calendar, DollarSign, FileText, MessageSquare } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { RecentMessages } from "@/components/dashboard/RecentMessages";
import { RecentExpenses } from "@/components/dashboard/RecentExpenses";
import { ChildProfiles } from "@/components/dashboard/ChildProfiles";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Bem-vindo ao FamiliApp</h1>
        <p className="text-muted-foreground">
          Gerencie a vida compartilhada das crianças de forma simples e organizada
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Próximos Eventos" 
          value="4" 
          description="Esta semana" 
          icon={<Calendar />}
          className="bg-gradient-to-br from-family-50 to-family-100 border-family-200"
        />
        <StatCard 
          title="Mensagens" 
          value="3" 
          description="2 não lidas" 
          icon={<MessageSquare />}
          className="bg-gradient-to-br from-accent-green-50 to-accent-green-100 border-accent-green-200"
        />
        <StatCard 
          title="Despesas" 
          value="R$ 2.000,00" 
          description="Este mês" 
          icon={<DollarSign />}
          trend={{ value: 5, positive: false }}
          className="bg-gradient-to-br from-warm-50 to-warm-100 border-warm-200"
        />
        <StatCard 
          title="Documentos" 
          value="15" 
          description="5 adicionados recentemente" 
          icon={<FileText />}
          className="bg-gradient-to-br from-muted to-muted/70 border-muted/90"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingEvents />
        <RecentMessages />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentExpenses />
        <ChildProfiles />
      </div>
    </div>
  );
};

export default Dashboard;
