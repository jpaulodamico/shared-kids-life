
import { ClipboardList, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ActivityCardProps {
  activities: string[];
}

export const ActivitiesCard = ({ activities }: ActivityCardProps) => {
  const getActivityDetails = (activity: string) => {
    const details = {
      "Natação": {
        schedule: "Segunda e Quinta, 15:00 - 16:00",
        location: "Academia Central - Prof. Ricardo"
      },
      "Ballet": {
        schedule: "Terça, 15:00 - 16:00",
        location: "Estúdio de Dança Lua - Profa. Beatriz"
      },
      "Inglês": {
        schedule: "Quarta, 15:00 - 16:00",
        location: "Centro Cultural - Profa. Amanda"
      },
      "Futebol": {
        schedule: "Terça, 16:00 - 17:00",
        location: "Clube Esportivo - Prof. Carlos"
      },
      "Música": {
        schedule: "Quinta, 16:00 - 17:00",
        location: "Centro Cultural - Prof. João"
      }
    };
    
    return details[activity as keyof typeof details] || {
      schedule: "Horário não definido",
      location: "Local não definido"
    };
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5" />
          Atividades Extracurriculares
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activities.map((activity, index) => {
            const details = getActivityDetails(activity);
            return (
              <Card key={index} className="border-none shadow-none bg-muted/50">
                <CardContent className="p-4">
                  <h3 className="font-medium">{activity}</h3>
                  <p className="text-sm text-muted-foreground">
                    {details.schedule}
                  </p>
                  <p className="text-xs mt-1">
                    {details.location}
                  </p>
                </CardContent>
              </Card>
            );
          })}
          
          <Card className="border-dashed shadow-none bg-transparent flex items-center justify-center">
            <CardContent className="p-4 text-center cursor-pointer">
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center mx-auto mb-2">
                <Plus className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Adicionar Atividade</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};
