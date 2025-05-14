
import { useState } from "react";
import { ClipboardList, Plus, Pencil } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ActivityDetails {
  schedule: string;
  location: string;
}

type ActivityDetailsMap = Record<string, ActivityDetails>;

interface ActivityCardProps {
  activities: string[];
}

export const ActivitiesCard = ({ activities }: ActivityCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Detalhes das atividades
  const activityDetailsMap: ActivityDetailsMap = {
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
  
  const getActivityDetails = (activity: string): ActivityDetails => {
    return activityDetailsMap[activity] || {
      schedule: "Horário não definido",
      location: "Local não definido"
    };
  };

  const handleAddActivity = () => {
    // Em um caso real, abriria um modal para adicionar uma atividade
    toast.info("Função de adicionar atividade será implementada em breve");
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      toast.success("Modo de edição desativado");
    } else {
      toast.info("Modo de edição ativado");
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5" />
          Atividades Extracurriculares
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={handleEditClick}>
          <Pencil className="h-4 w-4 mr-1" />
          {isEditing ? "Concluir" : "Editar"}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activities.map((activity, index) => {
            const details = getActivityDetails(activity);
            return (
              <Card key={index} className={`border-none shadow-none bg-muted/50 ${isEditing ? "border border-dashed border-primary/30" : ""}`}>
                <CardContent className="p-4">
                  <h3 className="font-medium">{activity}</h3>
                  <p className="text-sm text-muted-foreground">
                    {details.schedule}
                  </p>
                  <p className="text-xs mt-1">
                    {details.location}
                  </p>
                  {isEditing && (
                    <div className="flex justify-end mt-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        Editar
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
          
          <Card 
            className={`border-dashed shadow-none bg-transparent flex items-center justify-center cursor-pointer hover:bg-muted/10 transition-colors`}
            onClick={handleAddActivity}
          >
            <CardContent className="p-4 text-center">
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
