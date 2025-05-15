
import { useState, useEffect } from "react";
import { useChildren } from "@/hooks/use-supabase-data";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "@/hooks/use-user-role";
import { toast } from "@/components/ui/use-toast";
import { DashboardLoading } from "@/components/dashboard/DashboardLoading";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardWelcome } from "@/components/dashboard/DashboardWelcome";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

const Dashboard = () => {
  const [selectedChildId, setSelectedChildId] = useState("all");
  const { children, loading, hasData } = useChildren();
  const { user } = useAuth();
  const { isPrimary, loading: roleLoading } = useUserRole();
  
  // Removemos a notificação que estava sendo exibida para todos os usuários
  
  // Se está carregando, mostra um loading state
  if (loading || roleLoading) {
    return <DashboardLoading />;
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
        
        <DashboardWelcome isPrimary={isPrimary} />
      </div>
    );
  }

  // Childrendata atualizado para o dashboard - sem dados de teste
  const childrenData = children.length > 0 
    ? [
        {
          id: "all",
          name: "Todas as crianças",
          events: 0,
          messages: 0,
          expenses: 0,
          documents: 0,
          unreadMessages: 0,
          recentDocuments: 0
        },
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
    : [
        {
          id: "all",
          name: "Todas as crianças",
          events: 0,
          messages: 0,
          expenses: 0,
          documents: 0,
          unreadMessages: 0,
          recentDocuments: 0
        }
      ];

  return (
    <div className="space-y-6">
      <DashboardHeader 
        selectedChildId={selectedChildId}
        onSelectChild={setSelectedChildId}
        children={childrenData}
      />

      <DashboardContent selectedChildId={selectedChildId} />
    </div>
  );
};

export default Dashboard;
