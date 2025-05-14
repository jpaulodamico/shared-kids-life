
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Sample data
const children = [
  {
    id: "sofia",
    name: "Sofia Santos",
    age: 7,
    school: "Escola Miraflores",
    grade: "2º ano",
    imageUrl: "",
    initials: "SS"
  },
  {
    id: "lucas",
    name: "Lucas Santos",
    age: 5,
    school: "Jardim Infantil Arco-Íris",
    grade: "Pré-escolar",
    imageUrl: "",
    initials: "LS"
  }
];

interface ChildProfilesProps {
  selectedChildId?: string;
}

export function ChildProfiles({ selectedChildId = "all" }: ChildProfilesProps) {
  const navigate = useNavigate();
  
  // Filtra as crianças com base na seleção (mostra todas ou apenas a selecionada)
  const filteredChildren = selectedChildId === "all" 
    ? children 
    : children.filter(child => child.id === selectedChildId);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Perfis das Crianças</CardTitle>
          <CardDescription>Informações resumidas</CardDescription>
        </div>
        <User className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          {filteredChildren.map((child) => (
            <Card key={child.id} className="border-none shadow-none bg-muted/50">
              <CardContent className="p-4 flex flex-col items-center">
                <Avatar className="w-16 h-16 mb-2">
                  <AvatarFallback className="bg-family-100 text-family-700 text-lg">
                    {child.initials}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-center">{child.name}</h3>
                <p className="text-sm text-muted-foreground">{child.age} anos</p>
                <div className="mt-2 text-center">
                  <p className="text-xs">{child.school}</p>
                  <p className="text-xs text-muted-foreground">{child.grade}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end p-6 pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate("/children")}
        >
          Detalhes completos
        </Button>
      </CardFooter>
    </Card>
  );
}
