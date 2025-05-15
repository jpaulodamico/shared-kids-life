
import { useAuth } from "@/contexts/AuthContext";
import { ChildSelector } from "@/components/dashboard/ChildSelector";

interface DashboardHeaderProps {
  selectedChildId: string;
  onSelectChild: (id: string) => void;
  children: Array<{
    id: string;
    name: string;
    events?: number;
    messages?: number;
    expenses?: number;
    documents?: number;
    unreadMessages?: number;
    recentDocuments?: number;
  }>;
}

export const DashboardHeader = ({ 
  selectedChildId, 
  onSelectChild, 
  children 
}: DashboardHeaderProps) => {
  const selectedChild = children.find(child => child.id === selectedChildId) || children[0];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold">Bem-vindo ao CoParent</h1>
        <ChildSelector 
          selectedChildId={selectedChildId} 
          onSelectChild={onSelectChild}
          children={children}
        />
      </div>
      <p className="text-muted-foreground">
        {selectedChildId === "all" 
          ? "Gerencie a vida compartilhada das crianças de forma simples e organizada" 
          : `Visualizando informações de ${selectedChild.name}`}
      </p>
    </div>
  );
};
