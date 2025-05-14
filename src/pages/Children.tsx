
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChildHeader } from "@/components/children/ChildHeader";
import { ChildContent } from "@/components/children/ChildContent";
import { useChildren } from "@/hooks/use-supabase-data";
import { Skeleton } from "@/components/ui/skeleton";

const ChildrenPage = () => {
  const { children, loading } = useChildren();
  
  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-14 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }
  
  if (children.length === 0) {
    return (
      <div className="space-y-6">
        <ChildHeader 
          title="Crianças" 
          description="Gerenciamento de informações importantes sobre as crianças"
        />
        <div className="flex flex-col items-center justify-center py-12 bg-muted/40 rounded-lg">
          <h3 className="text-xl font-medium mb-2">Nenhuma criança cadastrada</h3>
          <p className="text-muted-foreground mb-4">
            Clique no botão "Adicionar Criança" acima para começar.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ChildHeader 
        title="Crianças" 
        description="Gerenciamento de informações importantes sobre as crianças"
      />

      <Tabs defaultValue={String(children[0]?.id) || ""}>
        <TabsList className="mb-6">
          {children.map((child) => (
            <TabsTrigger key={child.id} value={String(child.id)}>
              {child.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {children.map((child) => {
          // Por enquanto vamos utilizar um schedule vazio até implementar a parte de agenda
          const schedule = [
            { day: "Segunda", activities: [] },
            { day: "Terça", activities: [] },
            { day: "Quarta", activities: [] },
            { day: "Quinta", activities: [] },
            { day: "Sexta", activities: [] }
          ];
          
          return (
            <TabsContent key={child.id} value={String(child.id)} className="m-0">
              <ChildContent child={child} schedule={schedule} />
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default ChildrenPage;
