
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChildHeader } from "@/components/children/ChildHeader";
import { ChildContent } from "@/components/children/ChildContent";
import { children, sofiaSchedule, lucasSchedule } from "@/data/childrenData";

// Adicionar gênero às crianças
const childrenWithGender = children.map(child => ({
  ...child,
  gender: child.name.toLowerCase().includes('sofia') ? 'female' : 'male'
}));

const ChildrenPage = () => {
  return (
    <div className="space-y-6">
      <ChildHeader 
        title="Crianças" 
        description="Gerenciamento de informações importantes sobre as crianças"
      />

      <Tabs defaultValue="sofia">
        <TabsList className="mb-6">
          {childrenWithGender.map((child) => (
            <TabsTrigger key={child.id} value={child.name.toLowerCase().split(' ')[0]}>
              {child.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {childrenWithGender.map((child) => {
          const isFirst = child.id === 1;
          const schedule = isFirst ? sofiaSchedule : lucasSchedule;
          
          return (
            <TabsContent key={child.id} value={child.name.toLowerCase().split(' ')[0]} className="m-0">
              <ChildContent child={child} schedule={schedule} />
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default ChildrenPage;
