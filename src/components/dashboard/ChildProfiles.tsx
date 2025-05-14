
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Baby, Users, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useChildren } from "@/hooks/use-supabase-data";

interface ChildProfilesProps {
  selectedChildId?: string;
}

export function ChildProfiles({ selectedChildId = "all" }: ChildProfilesProps) {
  const navigate = useNavigate();
  const { children, loading } = useChildren();
  const [profileImages, setProfileImages] = useState<Record<string, string>>({});
  
  // Filtra as crianças com base na seleção (mostra todas ou apenas a selecionada)
  const filteredChildren = selectedChildId === "all" 
    ? children 
    : children.filter(child => String(child.id) === selectedChildId);

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
        {loading ? (
          <div className="p-6 text-center text-muted-foreground">
            Carregando perfis...
          </div>
        ) : filteredChildren.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
            {filteredChildren.map((child) => (
              <Card key={child.id} className="border-none shadow-none bg-muted/50">
                <CardContent className="p-4 flex flex-col items-center">
                  <Avatar className="w-16 h-16 mb-2">
                    {profileImages[String(child.id)] ? (
                      <AvatarImage src={profileImages[String(child.id)]} alt={child.name} />
                    ) : (
                      <AvatarFallback className={`${child.gender === 'female' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'} text-lg`}>
                        {child.gender === 'female' ? 
                          <Baby className="h-8 w-8" /> : 
                          <Users className="h-8 w-8" />
                        }
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <h3 className="font-semibold text-center">{child.name}</h3>
                  <p className="text-sm text-muted-foreground">{child.age} anos</p>
                  <div className="mt-2 text-center">
                    <p className="text-xs">{child.school || "Escola não informada"}</p>
                    <p className="text-xs text-muted-foreground">{child.grade || "Série não informada"}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="p-6 flex flex-col items-center justify-center text-center">
            <UserPlus className="h-12 w-12 text-muted-foreground/40 mb-3" />
            <p className="text-muted-foreground mb-4">
              Nenhuma criança cadastrada ainda.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate("/app/children")}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Adicionar Crianças
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end p-6 pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate("/app/children")}
        >
          Detalhes completos
        </Button>
      </CardFooter>
    </Card>
  );
}
