
import { Calendar, DollarSign, FileText, MessageSquare } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";

export const DashboardStats = () => {
  return (
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
  );
};
