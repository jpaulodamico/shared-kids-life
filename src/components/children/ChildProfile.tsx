
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Heart, 
  GraduationCap,
  User
} from "lucide-react";
import { Child } from "@/types/children";

interface ChildProfileProps {
  child: Child;
}

export const ChildProfile = ({ child }: ChildProfileProps) => {
  return (
    <Card className="md:col-span-1">
      <CardHeader className="text-center pb-2">
        <Avatar className="w-24 h-24 mx-auto mb-2">
          <AvatarFallback className="bg-family-100 text-family-700 text-3xl">
            {child.initials}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-xl">{child.name}</CardTitle>
        <p className="text-muted-foreground">{child.age} anos</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium flex items-center gap-1">
              <User className="h-4 w-4" />
              Informações Básicas
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Data Nasc.:</div>
              <div>{child.birthday}</div>
              <div className="text-muted-foreground">Idade:</div>
              <div>{child.age} anos</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium flex items-center gap-1">
              <GraduationCap className="h-4 w-4" />
              Educação
            </h3>
            <div className="space-y-1 text-sm">
              <div>
                <span className="text-muted-foreground">Escola: </span>
                {child.school}
              </div>
              <div>
                <span className="text-muted-foreground">Série: </span>
                {child.grade}
              </div>
              <div>
                <span className="text-muted-foreground">Professor(a): </span>
                {child.teacher}
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium flex items-center gap-1">
              <Heart className="h-4 w-4" />
              Saúde
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Tipo Sanguíneo:</div>
              <div>{child.bloodType}</div>
              <div className="text-muted-foreground">Altura:</div>
              <div>{child.height}</div>
              <div className="text-muted-foreground">Peso:</div>
              <div>{child.weight}</div>
              <div className="text-muted-foreground">Última Consulta:</div>
              <div>{child.lastCheckup}</div>
            </div>
            
            <div className="text-sm mt-2">
              <div className="text-muted-foreground mb-1">Alergias:</div>
              <div className="flex flex-wrap gap-1">
                {child.allergies.map((allergy, index) => (
                  <span 
                    key={index}
                    className="px-2 py-0.5 bg-destructive/10 text-destructive rounded-full text-xs"
                  >
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="text-sm mt-2">
              <div className="text-muted-foreground mb-1">Medicamentos:</div>
              <div className="flex flex-wrap gap-1">
                {child.medications.map((medication, index) => (
                  <span 
                    key={index}
                    className="px-2 py-0.5 bg-family-100 text-family-700 rounded-full text-xs"
                  >
                    {medication}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
